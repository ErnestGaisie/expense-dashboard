import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { formatCurrency } from "../lib/utils"

export default function ExpensePieChart({ users }) {
  // Calculate average expenses by category across all users
  const calculateAverageExpensesByCategory = () => {
    const categoryTotals = {}
    const categoryCounts = {}

    users.forEach((user) => {
      if (!user.transactions) return

      user.transactions.forEach((transaction) => {
        if (transaction.type === "expense" && transaction.category) {
          if (!categoryTotals[transaction.category]) {
            categoryTotals[transaction.category] = 0
            categoryCounts[transaction.category] = 0
          }
          categoryTotals[transaction.category] += transaction.amount
          categoryCounts[transaction.category]++
        }
      })
    })

    return Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category] / (users.length || 1),
    }))
  }

  const data = calculateAverageExpensesByCategory()

  // If no data, show a message
  if (data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No expense data available</p>
      </div>
    )
  }

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            labelFormatter={(name) => `Category: ${name}`}
            contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
