const express = require("express");
const router = express.Router();
const addBook = require("../controller/user" );
router.route("/").get(addBook);

module.exports = router;