const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Author = sequelize.define('Author', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name:  { type: DataTypes.STRING, allowNull: false },
  last_name:   { type: DataTypes.STRING, allowNull: false },
  nationality: { type: DataTypes.STRING, allowNull: true },
}, { tableName: 'authors', timestamps: false });

module.exports = Author;