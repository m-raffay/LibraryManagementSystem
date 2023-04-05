const express = require("express");
const router = express.Router();
const app = express();
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
const user = require("../controller/user");
const books = require("../controller/books");
const buy = require("../controller/buy");
const addbooksadmin = require("../controller/addbooksadmin");
const showbooksusr = require("../controller/showbooksusr");
const deletebooks = require("../controller/deletebooks");
const authenticate = require("../controller/authenticate");
const customer = require("../controller/customers");
const review = require("../controller/reviews" );
const admin = require("../controller/admin");
const order = require("../controller/order");
const orderitem = require("../controller/orderitems");
const notfound = require("../controller/notfound");

// const OrderItems = require("../models/orderitem");
// router.route("/").get(addBook);

const auth = require("../controller/auth");
const authenticateToken = require("../middleware/authenticateToken");

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

// All other routes should redirect to the index.html
router.get('/*', notfound.func);
// router.get("/user", user.func);
// router.get("/buy", buy.func);
// router.get("/admin", admin.func);
// router.get("/addbooksadmin", addbooksadmin.func);
// router.get("/showbookusr", showbooksusr.func);
// router.get("/deletebooks", deletebooks.func);
// router.get("/authenticate", authenticate.func);
module.exports = router;