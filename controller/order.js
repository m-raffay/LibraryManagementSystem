const Orders = require("../models/Orders");

const ordersController = {
  async getAllOrders(req, res) {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const offset = (page - 1) * limit;
      const whereClause = status ? { status } : {};

      console.log(`Getting orders for page ${page}, limit ${limit}, and status ${status}`);

      const orders = await Orders.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [["id", "ASC"]],
      });

      console.log(`Retrieved ${orders.rows.length} orders out of ${orders.count}`);

      const totalPages = Math.ceil(orders.count / limit);

      res.json({
        orders: orders.rows,
        pagination: {
          page,
          limit,
          totalOrders: orders.count,
          totalPages,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving orders");
    }
  },

  async getOrderById(req, res) {
    const { id } = req.params;
    try {
      const order = await Orders.findByPk(id);
      if (!order) {
        return res.status(404).send("Order not found");
      }
      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving order");
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
      res.status(500).send("Error creating order");
    }
  },

  async updateOrderById(req, res) {
    const { id } = req.params;
    const { orderDate, shippingDate, totalCost, status } = req.body;
    try {
      const order = await Orders.findByPk(id);
      if (!order) {
        return res.status(404).send("Order not found");
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
      res.status(500).send("Error updating order");
    }
  },

  async deleteOrderById(req, res) {
    const { id } = req.params;
    try {
      const order = await Orders.findByPk(id);
      if (!order) {
        return res.status(404).send("Order not found");
      }
      await order.destroy();
      res.send("Order deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting order");
    }
  },
};

module.exports = ordersController;