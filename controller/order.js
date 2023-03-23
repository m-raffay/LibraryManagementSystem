const Orders = require("../models/Orders");

const ordersController = {
async getAllOrders(req, res) {
    try {
    const orders = await Orders.findAll();
    res.json(orders);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving orders');
    }
},

async getOrderById(req, res) {
    const { id } = req.params;
    try {
    const order = await Orders.findByPk(id);
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.json(order);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving order');
    }
},

async createOrder(req, res) {
    const { orderDate, shippingDate, totalCost, status } = req.body;
    try {
    const newOrder = await Orders.create({
        orderDate,
        shippingDate,
        totalCost,
        status,
    });
    res.json(newOrder);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error creating order');
    }
},

async updateOrderById(req, res) {
    const { id } = req.params;
    const { orderDate, shippingDate, totalCost, status } = req.body;
    try {
    const order = await Orders.findByPk(id);
    if (!order) {
        return res.status(404).send('Order not found');
    }
    const updatedOrder = await order.update({
        orderDate,
        shippingDate,
        totalCost,
        status,
    });
    res.json(updatedOrder);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error updating order');
    }
},

async deleteOrderById(req, res) {
    const { id } = req.params;
    try {
    const order = await Orders.findByPk(id);
    if (!order) {
        return res.status(404).send('Order not found');
    }
    await order.destroy();
    res.send('Order deleted successfully');
    } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting order');
    }
},
};
 module.exports = ordersController;