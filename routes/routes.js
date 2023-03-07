const express = require("express");
const router = express.Router();
const path = require('path');
const user = require("../controller/user");
const books = require("../controller/books");
const buy = require("../controller/buy");
const admin = require("../controller/admin");
// const addBook = require("../controller/user" );
// router.route("/").get(addBook);

router.get("/user", user.func);
router.get("/books", books.func);
router.get("/buy", buy.func);
router.get("/admin", admin.func);

module.exports = router;