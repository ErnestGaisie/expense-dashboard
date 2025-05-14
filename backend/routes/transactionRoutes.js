const express = require("express");
const router = express.Router();
const {
  getUserTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// Get all transactions for a user
router.get("/:userId", getUserTransactions);

// Create new transaction
router.post("/:userId", createTransaction);

// Update transaction
router.put("/:id", updateTransaction);

// Delete transaction
router.delete("/:id", deleteTransaction);

module.exports = router;
