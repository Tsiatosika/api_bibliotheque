const Author = require('./Author');
const Book   = require('./Book');
const Borrow = require('./Borrow');
const User   = require('./User');

// Un auteur a plusieurs livres
Author.hasMany(Book,   { foreignKey: 'author_id', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });

// Un livre peut avoir plusieurs emprunts
Book.hasMany(Borrow,   { foreignKey: 'book_id', as: 'borrows' });
Borrow.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });

module.exports = { Author, Book, Borrow, User };