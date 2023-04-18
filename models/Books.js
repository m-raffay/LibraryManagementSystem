const DataTypes = require("sequelize");
const Sequelize = require("sequelize");
const sequelize= require('../database/dbconnection');
const Reviews = require("./Reviews");
const Orderitems=require('./Orderitem');
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
  // One-to-Many relationship between Books and Reviews
Books.hasMany(Reviews, { foreignKey: 'bookId' });
Reviews.belongsTo(Books, { foreignKey: 'bookId' });
// One-to-Many relationship between Books and Orderitems
Books.hasMany(Orderitems, { foreignKey: 'bookId' });
Orderitems.belongsTo(Books, { foreignKey: 'bookId' });
sequelize.sync();
  module.exports=Books;

  