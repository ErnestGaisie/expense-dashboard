import { mockUsers, getMockUserById } from "./mock-data";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Flag to use mock data when API is unavailable
const USE_MOCK_DATA = true; // Set to false when your API is ready

// Helper function to handle fetch errors
async function fetchWithErrorHandling(url, options = {}) {
  console.log(`Attempting to fetch from: ${url}`);

  if (USE_MOCK_DATA) {
    console.log("Using mock data instead of API");
    // Return null to trigger the mock data fallback
    return null;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    // Return a default value based on the expected return type
    return null;
  }
}

// Get all users with summary data
export async function getUsersWithSummary() {
  // Fetch users from the API
  const users = await fetchWithErrorHandling(`${API_URL}/users`);

  // If API fetch failed, use mock data
  if (!users) {
    console.log("Using mock users data");
    return mockUsers;
  }

  // For each user, fetch their transactions to calculate totals
  const usersWithSummary = await Promise.all(
    users.map(async (user) => {
      try {
        // Use the correct transactions endpoint
        const transactions = await fetchWithErrorHandling(
          `${API_URL}/transactions/${user._id}`
        );

        if (!transactions) {
          return {
            ...user,
            totalIncome: 0,
            totalExpense: 0,
          };
        }

        const totalIncome = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          ...user,
          totalIncome,
          totalExpense,
          transactions,
        };
      } catch (error) {
        console.error(
          `Error fetching transactions for user ${user._id}:`,
          error
        );
        return {
          ...user,
          totalIncome: 0,
          totalExpense: 0,
        };
      }
    })
  );

  return usersWithSummary;
}

// Get a single user by ID
export async function getUserById(userId) {
  const user = await fetchWithErrorHandling(`${API_URL}/users/${userId}`);

  // If API fetch failed, use mock data
  if (!user) {
    console.log(`Using mock data for user ${userId}`);
    return getMockUserById(userId) || null;
  }

  return user;
}

// Get a user with their transactions
export async function getUserWithTransactions(userId) {
  // Fetch the user
  const user = await getUserById(userId);
  if (!user) return null;

  // If we're using mock data, the transactions are already included
  if (USE_MOCK_DATA) {
    return user;
  }

  // Fetch the user's transactions using the correct endpoint
  const transactions = await fetchWithErrorHandling(
    `${API_URL}/transactions/${userId}`
  );

  return {
    ...user,
    transactions: transactions || [],
  };
}

// Create a new user
export async function createUser(userData) {
  if (USE_MOCK_DATA) {
    // Create a mock user with a random ID
    const newUser = {
      _id: Math.random().toString(36).substring(2, 15),
      ...userData,
      totalIncome: 0,
      totalExpense: 0,
      transactions: [],
    };

    console.log("Created mock user:", newUser);
    return newUser;
  }

  return await fetchWithErrorHandling(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// Update an existing user
export async function updateUser(userId, userData) {
  if (USE_MOCK_DATA) {
    console.log(`Mock update for user ${userId}:`, userData);

    // Return a simulated updated user
    return {
      _id: userId,
      name: userData.name || "Updated User",
      email: userData.email || "updated@example.com",
      totalIncome: 0,
      totalExpense: 0,
    };
  }

  try {
    return await fetchWithErrorHandling(`${API_URL}/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    return null;
  }
}

// Delete a user
export async function deleteUser(userId) {
  if (USE_MOCK_DATA) {
    console.log(`Mock delete for user ${userId}`);
    return true;
  }

  try {
    await fetchWithErrorHandling(`${API_URL}/users/${userId}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    return false;
  }
}

// Create a new transaction
export async function createTransaction(userId, transactionData) {
  if (USE_MOCK_DATA) {
    // Create a mock transaction with a random ID
    const newTransaction = {
      _id: Math.random().toString(36).substring(2, 15),
      userId,
      ...transactionData,
    };

    console.log("Created mock transaction:", newTransaction);
    return newTransaction;
  }

  return await fetchWithErrorHandling(`${API_URL}/transactions/${userId}`, {
    method: "POST",
    body: JSON.stringify(transactionData),
  });
}

// Update an existing transaction
export async function updateTransaction(
  userId,
  transactionId,
  transactionData
) {
  if (USE_MOCK_DATA) {
    console.log(
      `Mock update for transaction ${transactionId}:`,
      transactionData
    );

    // Return a simulated updated transaction
    return {
      _id: transactionId,
      userId,
      type: transactionData.type || "expense",
      amount: transactionData.amount || 0,
      description: transactionData.description || "Updated Transaction",
      category: transactionData.category,
      date: transactionData.date || new Date().toISOString(),
    };
  }

  try {
    return await fetchWithErrorHandling(
      `${API_URL}/transactions/${transactionId}`,
      {
        method: "PUT",
        body: JSON.stringify(transactionData),
      }
    );
  } catch (error) {
    console.error(`Error updating transaction ${transactionId}:`, error);
    return null;
  }
}

// Delete a transaction
export async function deleteTransaction(userId, transactionId) {
  if (USE_MOCK_DATA) {
    console.log(`Mock delete for transaction ${transactionId}`);
    return true;
  }

  try {
    await fetchWithErrorHandling(`${API_URL}/transactions/${transactionId}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error(`Error deleting transaction ${transactionId}:`, error);
    return false;
  }
}
