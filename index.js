const express = require("express");

const app = express();
let port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
