const express = require("express");
const router = express.Router();
const path = require('path');
const user = require("../controller/user");
const books = require("../controller/books");
const buy = require("../controller/buy");
const admin = require("../controller/admin");
const addbooksadmin = require("../controller/addbooksadmin");
const showbooksusr = require("../controller/showbooksusr");
const deletebooks = require("../controller/deletebooks");
const authenticate = require("../controller/authenticate");
// const addBook = require("../controller/user" );
// router.route("/").get(addBook);

router.get("/bookbyid/:id", books.getBookById);
router.delete("/deletebookbyid/:id", books.deleteBookById);
router.get("/allbooks", books.getAllBooks);
router.post("/createbook", books.createBook);
router.put("/updatebookbyid/:id", books.updateBookById);

router.get("/customerbyid/:id", customer.getCustomerById);
router.delete("/deletecustomerbyid/:id", customer.deleteCustomerbyid);
router.get("/allcustomers", customer.getAllCustomers);
router.post("/createcustomer", customer.createCustomer);
router.put("/updatecustomerbyid/:id", customer.updateCustomerbyid);

router.get("/reviewbyid/:id", review.getReviewById);
router.delete("/deletereviewbyid/:id", review.deleteReviewById);
router.get("/allreview", review.getAllReviews);
router.post("/createreview", review.createReview);
router.put("/updatereviewbyid/:id", review.updateReviewById);


router.get("/adminbyid/:id",admin.getAdminById);
router.delete("/deletereadminbyid/:id",admin.deleteAdminById);
router.get("/allreview", admin.getAllAdmins);
router.post("/createadmin", admin.createAdmin);
router.put("/updateadminbyid/:id", admin.updateAdminById);

router.get("/orderbyid/:id",order.getOrderById);
router.delete("/deletereorderbyid/:id",order.deleteOrderById);
router.get("/allorder", order.getAllOrders);
router.post("/createorder", order.createOrder);
router.put("/updateorderbyid/:id", order.updateOrderById);

router.get("/orderitemsbyid/:id",orderitem.getOrderItemById);
router.delete("/deletereorderitemsbyid/:id",orderitem.deleteOrderItemById);
router.post("/createorderitems", orderitem.createOrderItem);
router.put("/updateorderitemsbyid/:id", orderitem.updateOrderItemById);


router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});


// router.get("/user", user.func);
// router.get("/buy", buy.func);
// router.get("/admin", admin.func);
// router.get("/addbooksadmin", addbooksadmin.func);
// router.get("/showbookusr", showbooksusr.func);
// router.get("/deletebooks", deletebooks.func);
// router.get("/authenticate", authenticate.func);
module.exports = router;