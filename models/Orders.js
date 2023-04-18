const DataTypes = require("sequelize");
const Sequelize = require("sequelize");
const sequelize= require('../database/dbconnection');  
const Orderitems=require('./Orderitem')
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
// One-to-Many relationship between Order and Orderitems
Orders.hasMany(Orderitems, { foreignKey: 'orderId' });
Orderitems.belongsTo(Orders, { foreignKey: 'orderId' });
sequelize.sync();
  module.exports=Orders;
