export const mockUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    totalIncome: 5000,
    totalExpense: 3200,
    transactions: [
      {
        _id: "t1",
        userId: "1",
        type: "income",
        amount: 3000,
        description: "Salary",
        date: new Date().toISOString(),
      },
      {
        _id: "t2",
        userId: "1",
        type: "income",
        amount: 2000,
        description: "Freelance work",
        date: new Date().toISOString(),
      },
      {
        _id: "t3",
        userId: "1",
        type: "expense",
        amount: 1500,
        description: "Rent",
        category: "Housing",
        date: new Date().toISOString(),
      },
      {
        _id: "t4",
        userId: "1",
        type: "expense",
        amount: 800,
        description: "Groceries",
        category: "Food & Dining",
        date: new Date().toISOString(),
      },
      {
        _id: "t5",
        userId: "1",
        type: "expense",
        amount: 900,
        description: "Utilities",
        category: "Utilities",
        date: new Date().toISOString(),
      },
    ],
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    totalIncome: 4500,
    totalExpense: 2800,
    transactions: [
      {
        _id: "t6",
        userId: "2",
        type: "income",
        amount: 4500,
        description: "Salary",
        date: new Date().toISOString(),
      },
      {
        _id: "t7",
        userId: "2",
        type: "expense",
        amount: 1200,
        description: "Rent",
        category: "Housing",
        date: new Date().toISOString(),
      },
      {
        _id: "t8",
        userId: "2",
        type: "expense",
        amount: 600,
        description: "Groceries",
        category: "Food & Dining",
        date: new Date().toISOString(),
      },
      {
        _id: "t9",
        userId: "2",
        type: "expense",
        amount: 1000,
        description: "Car payment",
        category: "Transportation",
        date: new Date().toISOString(),
      },
    ],
  },
];

// Function to get mock user by ID
export function getMockUserById(userId) {
  return mockUsers.find((user) => user._id === userId);
}
