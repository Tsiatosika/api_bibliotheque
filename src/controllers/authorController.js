const { Author, Book } = require('../models');

exports.index = async (req, res) => {
  const authors = await Author.findAll();
  res.json({ success: true, data: authors, message: 'Liste des auteurs' });
};

exports.show = async (req, res) => {
  const author = await Author.findByPk(req.params.id, { include: [{ model: Book, as: 'books' }] });
  if (!author) return res.status(404).json({ success: false, message: 'Auteur introuvable' });
  res.json({ success: true, data: author, message: 'Détails auteur' });
};

exports.store = async (req, res) => {
  try {
    const { first_name, last_name, nationality } = req.body;
    if (!first_name || !last_name)
      return res.status(422).json({ success: false, message: 'Validation échouée',
        errors: { first_name: ['Requis'], last_name: ['Requis'] } });

    const author = await Author.create({ first_name, last_name, nationality });
    res.status(201).json({ success: true, data: author, message: 'Auteur créé' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ success: false, message: 'Auteur introuvable' });
  await author.update(req.body);
  res.json({ success: true, data: author, message: 'Auteur modifié' });
};

exports.destroy = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ success: false, message: 'Auteur introuvable' });
  await author.destroy();
  res.status(204).send();
};