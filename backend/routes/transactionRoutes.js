const express = require("express");
const { getTransactions } = require("../controllers/transactionController");
const router = express.Router();

router.get("/transactions", getTransactions);
// router.get("/", getTransactions);

module.exports = router;
