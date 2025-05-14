const Transaction = require("../models/Transaction");

// Get all transactions for a user
exports.getUserTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.userId });
  res.json(transactions);
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  const newTransaction = new Transaction({
    ...req.body,
    userId: req.params.userId,
  });
  const saved = await newTransaction.save();
  res.status(201).json(saved);
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted" });
};
