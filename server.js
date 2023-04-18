const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/dbconnection');
require('dotenv').config(); // load environmental variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000; // use environmental variable or default to 3000
const route = require('./routes/routes');
app.use('/', route);

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
