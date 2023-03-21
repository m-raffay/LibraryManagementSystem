const DataTypes = require("sequelize");
const Sequelize = require("sequelize");
const sequelize= require('../database/dbconnection');  
  
  // Define Orders table
  const Orders = sequelize.define('orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderDate: Sequelize.DATE,
    shippingDate: Sequelize.DATE,
    totalCost: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    status: Sequelize.STRING,
  });

  module.exports=Orders;
  sequelize.sync();