const express = require("express");
const routes = require("./routes");

const app = express();
let port = 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
