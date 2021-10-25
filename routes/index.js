const express = require("express");

const { home, balance } = require("../controllers");

const router = express.Router();

router.get("/balances/:id", balance.getTotalBalance);
router.get("*", home.getHome);

module.exports = router;
