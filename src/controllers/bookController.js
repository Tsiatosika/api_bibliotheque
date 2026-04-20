const { Book, Author } = require('../models');

exports.index = async (req, res) => {
  const where = {};
  if (req.query.available !== undefined)
    where.available = req.query.available === 'true';

  const books = await Book.findAll({ where, include: [{ model: Author, as: 'author' }] });
  res.json({ success: true, data: books, message: 'Liste des livres' });
};

exports.show = async (req, res) => {
  const book = await Book.findByPk(req.params.id, { include: [{ model: Author, as: 'author' }] });
  if (!book) return res.status(404).json({ success: false, message: 'Livre introuvable' });
  res.json({ success: true, data: book, message: 'Détails livre' });
};

exports.store = async (req, res) => {
  try {
    const { title, isbn, year, author_id } = req.body;
    const errors = {};
    if (!title)     errors.title     = ['Le titre est requis.'];
    if (!isbn)      errors.isbn      = ['L\'ISBN est requis.'];
    if (!year)      errors.year      = ['L\'année est requise.'];
    if (!author_id) errors.author_id = ['L\'auteur est requis.'];

    if (Object.keys(errors).length)
      return res.status(422).json({ success: false, message: 'Validation échouée', errors });

    // Vérifier unicité ISBN
    const existing = await Book.findOne({ where: { isbn } });
    if (existing)
      return res.status(422).json({ success: false, message: 'Validation échouée',
        errors: { isbn: ['Cet ISBN existe déjà.'] } });

    const book = await Book.create({ title, isbn, year, author_id });
    res.status(201).json({ success: true, data: book, message: 'Livre créé' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ success: false, message: 'Livre introuvable' });
  await book.update(req.body);
  res.json({ success: true, data: book, message: 'Livre modifié' });
};

exports.destroy = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ success: false, message: 'Livre introuvable' });
  await book.destroy();
  res.status(204).send();
};