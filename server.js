const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/dbconnection');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.port || 3000;
// const userRoute = require("./routes/routes");

const route = require('./routes/routes');
app.use('/', route);
// app.use('/', (req,res) => {
//   res.json ({
//     message : "Sample"
//   })
// });

// app.use("/", userRoute);
// app.set("view engine", "hbs")
// app.use(express.static('public'))
// app.get("", function(req, res) {
//   res.render("index");
// });

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
