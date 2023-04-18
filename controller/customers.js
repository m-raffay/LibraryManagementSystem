const Customers  = require('../models/Customers');
const { Op } = require('sequelize');
const createCustomer = async (req, res) => {
  const { name, email, shippingAddress, billingInfo } = req.body;
  
  try {
    const customer = await Customers.create({
      name,
      email,
      shippingAddress,
      billingInfo,
    });
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer: ', error);
    res.status(500).json({ error: 'Unable to create customer' });
  }
};

const getAllCustomers = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const sortBy = req.query.sortBy ? req.query.sortBy : "id";
  const sortOrder = req.query.sortOrder ? req.query.sortOrder : "asc";
  const name = req.query.name ? req.query.name : "";

  try {
    const offset = (page - 1) * pageSize;
    const customers = await Customers.findAndCountAll({
    where: {
  name: { [Op.like]: `%${name}%` },
},
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      offset: offset,
    });

    console.log(`Retrieved ${customers.rows.length} customers.`);
    res.json({
      customers: customers.rows,
      totalCount: customers.count,
      currentPage: page,
      pageSize: pageSize,
    });
  } catch (error) {
    console.error('Error retrieving customers: ', error);
    res.status(500).json({ error: 'Unable to retrieve customers' });
  }
};



const getCustomerById = async (req, res) => {
  const id = req.params.id;
  
  try {
    const customer = await Customers.findByPk(id);
    if (customer) {
      console.log(`Retrieved customer with ID ${id}: `, customer);
      res.json(customer);
    } else {
      console.log(`Customer with ID ${id} not found.`);
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(`Error retrieving customer with ID ${id}: `, error);
    res.status(500).json({ error: 'Unable to retrieve customer' });
  }
};

const updateCustomerbyid = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  
  try {
    const customer = await Customers.findByPk(id);
    if (customer) {
      await customer.update(updates);
      console.log(`Customer with ID ${id} has been updated.`);
      res.json(customer);
    } else {
      console.log(`Customer with ID ${id} not found.`);
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(`Error updating customer with ID ${id}: `, error);
    res.status(500).json({ error: 'Unable to update customer' });
  }
};

const deleteCustomerbyid = async (req, res) => {
  const id = req.params.id;
  
  try {
    const customer = await Customers.findByPk(id);
    if (customer) {
      await customer.destroy();
      console.log(`Customer with ID ${id} has been deleted.`);
      res.status(204).send();
    } else {
      console.log(`Customer with ID ${id} not found.`);
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}: `, error);
    res.status(500).json({ error: 'Unable to delete customer' });
  }
};

module.exports = { createCustomer, getAllCustomers, getCustomerById, updateCustomerbyid, deleteCustomerbyid };
