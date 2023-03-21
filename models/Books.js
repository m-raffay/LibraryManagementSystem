const DataTypes = require("sequelize");
const Sequelize = require("sequelize");
const sequelize= require('../database/dbconnection');
// Define Books table
const Books = sequelize.define('books', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publicationDate: Sequelize.DATEONLY,
    isbn: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    genre: Sequelize.STRING,
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    quantityInStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  
  module.exports=Books;
  sequelize.sync();
  