const DataTypes = require("sequelize");
const Sequelize = require("sequelize");
const sequelize= require('../database/dbconnection');
  
    // Define Order Items table
const OrderItems = sequelize.define('orderItems', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    },
    price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    },
    });
    module.exports=OrderItems;
    sequelize.sync();