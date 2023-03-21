const DataTypes = require("sequelize");
const Sequelize = require("sequelize");
const sequelize= require('../database/dbconnection');
const reviews = require("../models/Reviews");
// Define Customers table
const Customers = sequelize.define('customers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  shippingAddress: Sequelize.STRING,
  billingInfo: Sequelize.STRING,
});

sequelize.sync().then(() => {
  console.log('Customer table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// Customers.hasMany(reviews);
// reviews.belongsTo(Customers);

sequelize.sync();