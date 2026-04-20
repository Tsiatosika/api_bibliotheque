const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Borrow = sequelize.define('Borrow', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_name:   { type: DataTypes.STRING, allowNull: false },
  book_id:     { type: DataTypes.INTEGER, allowNull: false },
  borrowed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returned_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
}, { tableName: 'borrows', timestamps: false });

module.exports = Borrow;