const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    const summaries = await Promise.all(
      users.map(async (user) => {
        const transactions = await Transaction.find({ userId: user._id });

        const totalIncome = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        const categoryTotals = transactions
          .filter((t) => t.type === "expense")
          .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
          }, {});

        return {
          ...user.toObject(),
          totalIncome,
          totalExpense,
          categoryTotals,
        };
      })
    );

    res.json(summaries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
};

exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
