const OrderItems = require("../models/Orderitem");

const createOrderItem = async (req, res) => {
  const { quantity, price } = req.body;
  try {
    const orderItem = await OrderItems.create({
      id: req.params.id,
      quantity,
      price,
    });
    res.status(201).json(orderItem);
  } catch (error) {
    console.error("Error creating order item: ", error);
    res.status(500).json({ error: "Unable to create order item" });
  }
};
const deleteOrderItemById = async (req, res) => {
    const id = req.params.id;
    try {
      const orderItem = await OrderItems.findByPk(id);
      if (orderItem) {
        await orderItem.destroy();
        console.log(`Order item with ID ${id} has been deleted.`);
        res.status(204).send();
      } else {
        console.log(`Order item with ID ${id} not found.`);
        res.status(404).json({ error: 'Order item not found' });
      }
    } catch (error) {
      console.error(`Error deleting order item with ID ${id}: `, error);
      res.status(500).json({ error: 'Unable to delete order item' });
    }
  };
  
const getOrderItemById = async (req, res) => {
  const id = req.params.id;
  try {
    const orderItem = await OrderItems.findByPk(id);
    if (orderItem) {
      console.log(`Retrieved order item with ID ${id}: `, orderItem);
      res.json(orderItem);
    } else {
      console.log(`Order item with ID ${id} not found.`);
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    console.error(`Error retrieving order item with ID ${id}: `, error);
    res.status(500).json({ error: "Unable to retrieve order item" });
  }
};

const updateOrderItemById = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const orderItem = await OrderItems.findByPk(id);
    if (orderItem) {
      await orderItem.update(updates);
      console.log(`Order item with ID ${id} has been updated.`);
      res.json(orderItem);
    } else {
      console.log(`Order item with ID ${id} not found.`);
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    console.error(`Error updating order item with ID ${id}: `, error);
    res.status(500).json({ error: "Unable to update order item" });
  }
};

const getOrderItems = async (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const filter = req.query.filter || {};
  try {
    const orderItems = await OrderItems.findAll({
      where: filter,
      limit: limit,
      offset: offset,
    });
    console.log(`Retrieved ${orderItems.length} order items.`);
    res.json(orderItems);
  } catch (error) {
    console.error(`Error retrieving order items: `, error);
    res.status(500).json({ error: "Unable to retrieve order items" });
  }
};

module.exports = { updateOrderItemById, getOrderItems,createOrderItem,getOrderItemById,deleteOrderItemById };
