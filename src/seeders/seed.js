require('dotenv').config();
const sequelize = require('../config/database');
const { User, Author, Book, Borrow } = require('../models');

async function seed() {
  await sequelize.sync({ force: true }); 

  const user = await User.create({ name: 'Admin', email: 'admin@biblio.com', password: 'password123' });

  const authors = await Author.bulkCreate([
    { first_name: 'Robert',  last_name: 'Martin',    nationality: 'Américain' },
    { first_name: 'Martin',  last_name: 'Fowler',    nationality: 'Britannique' },
    { first_name: 'Sandro',  last_name: 'Mancuso',   nationality: 'Brésilien' },
  ]);

  const books = await Book.bulkCreate([
    { title: 'Clean Code',          isbn: '978-0132350884', year: 2008, available: true,  author_id: authors[0].id },
    { title: 'Clean Architecture',  isbn: '978-0134494166', year: 2017, available: true,  author_id: authors[0].id },
    { title: 'Refactoring',         isbn: '978-0201485677', year: 1999, available: false, author_id: authors[1].id },
    { title: 'Patterns of EAA',     isbn: '978-0321127426', year: 2002, available: true,  author_id: authors[1].id },
    { title: 'The Software Craftsman', isbn: '978-0134052501', year: 2014, available: true, author_id: authors[2].id },
  ]);

  await Borrow.bulkCreate([
    { user_name: 'Alice',  book_id: books[2].id, borrowed_at: new Date('2026-04-01') },
    { user_name: 'Bob',    book_id: books[0].id, borrowed_at: new Date('2026-04-10'), returned_at: new Date('2026-04-15') },
  ]);

  console.log('✅ Seed terminé ! Utilisateur : admin@biblio.com / password123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });