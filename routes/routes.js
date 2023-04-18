const express = require("express");
const router = express.Router();

const books = require("../controller/books");
const customers = require("../controller/customers");
const reviews = require("../controller/reviews");
const admins = require("../controller/admin");
const orders = require("../controller/order");
const orderItems = require("../controller/orderitems");
const auth = require("../controller/auth");
const user=require("../controller/user");
const authenticateToken = require("../middleware/authenticateToken");

// User routes
router.get("/allusers", user.getAllUsers);
router.get("/userbyid/:id", user.getUserById);
router.post("/createuser", user.createUser);
router.put("/updateuserbyid/:id", user.updateUserById);
router.delete("/deleteuserbyid/:id", user.deleteUserById);
// Book routes
router.get("/allbooks", books.getAllBooks);
router.get("/bookbyid/:id", books.getBookById);
router.post("/createbook", books.createBook);
router.put("/updatebookbyid/:id", books.updateBookById);
router.delete("/deletebookbyid/:id", books.deleteBookById);

// Customer routes
router.get("/allcustomers", customers.getAllCustomers);
router.get("/customerbyid/:id", customers.getCustomerById);
router.post("/createcustomer", customers.createCustomer);
router.put("/updatecustomerbyid/:id", customers.updateCustomerbyid);
router.delete("/deletecustomerbyid/:id", customers.deleteCustomerbyid);

// Review routes
router.get("/allreviews", reviews.getAllReviews);
router.get("/reviewbyid/:id", reviews.getReviewById);
router.post("/createreviews", reviews.createReview);
router.put("/updatereviewbyid/:id", reviews.updateReviewById);
router.delete("/deletereviewbyid/:id", reviews.deleteReviewById);

// Admin routes
router.get("/alladmins", admins.getAllAdmins);
router.get("/adminbyid/:id", admins.getAdminById);
router.post("/createadmin", admins.createAdmin);
router.put("/updateadminbyid/:id", admins.updateAdminById);
router.delete("/deleteadminbyid/:id", admins.deleteAdminById);

// Order routes
router.get("/allorders", orders.getAllOrders);
router.get("/ordersbyid/:id", orders.getOrderById);
router.post("/createorder", orders.createOrder);
router.put("/updateorderbyid/:id", orders.updateOrderById);
router.delete("/deleteorderbyid/:id", orders.deleteOrderById);

// Order item routes
router.get("/allorderitems", orderItems.getOrderItems);
router.get("/orderitemsbyid/:id", orderItems.getOrderItemById);
router.post("/createorderitem", orderItems.createOrderItem);
router.put("/updateorderitembyid/:id", orderItems.updateOrderItemById);
router.delete("/deleteorderitembyid/:id", orderItems.deleteOrderItemById);

// Authentication routes
router.post("/register", auth.register);
router.post("/login", auth.login);

// Admin routes that require authentication
router.post("/admin/add-book", authenticateToken.authenticateToken, function(req, res) {
  books.createBook(req, res);
});

// Catch-all route
router.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = router;