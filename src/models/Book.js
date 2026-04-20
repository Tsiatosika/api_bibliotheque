const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title:     { type: DataTypes.STRING, allowNull: false },
  isbn:      { type: DataTypes.STRING, allowNull: false, unique: true },
  year:      { type: DataTypes.INTEGER, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
  author_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'books', timestamps: false });

module.exports = Book;