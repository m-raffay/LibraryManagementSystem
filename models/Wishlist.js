const DataTypes = require("sequelize");
const Sequelize = require("sequelize");
const sequelize= require('../database/dbconnection');
 
 // Define Wishlist table
 const Wishlist = sequelize.define('wishlist', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  module.exports=Wishlist;
  
  sequelize.sync();