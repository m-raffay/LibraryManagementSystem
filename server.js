const express = require("express");
const app = express();
const port = process.env.port || 3000;
const userRoute = require("./routes/routes");

app.use("/", userRoute);

app.get("/", function(req, res) {
  res.send("gfdddd");
});

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
