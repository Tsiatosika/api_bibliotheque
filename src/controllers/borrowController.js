const { Borrow, Book } = require('../models');

exports.index = async (req, res) => {
  const borrows = await Borrow.findAll({ include: [{ model: Book, as: 'book' }] });
  res.json({ success: true, data: borrows, message: 'Liste des emprunts' });
};

exports.store = async (req, res) => {
  try {
    const { user_name, book_id } = req.body;
    if (!user_name || !book_id)
      return res.status(422).json({ success: false, message: 'Validation échouée',
        errors: { user_name: ['Requis'], book_id: ['Requis'] } });

    const book = await Book.findByPk(book_id);
    if (!book)     return res.status(404).json({ success: false, message: 'Livre introuvable' });
    if (!book.available)
      return res.status(422).json({ success: false, message: 'Ce livre n\'est pas disponible' });

    const borrow = await Borrow.create({ user_name, book_id });
    await book.update({ available: false });

    res.status(201).json({ success: true, data: borrow, message: 'Emprunt enregistré' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const borrow = await Borrow.findByPk(req.params.id);
  if (!borrow) return res.status(404).json({ success: false, message: 'Emprunt introuvable' });
  if (borrow.returned_at)
    return res.status(422).json({ success: false, message: 'Livre déjà retourné' });

  await borrow.update({ returned_at: new Date() });
  await Book.update({ available: true }, { where: { id: borrow.book_id } });

  res.json({ success: true, data: borrow, message: 'Livre retourné' });
};