import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserList from "../components/UserList"
import ExpensePieChart from "../components/ExpensePieChart"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Plus } from "lucide-react"
import { getUsersWithSummary } from "../lib/api"

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersWithSummary()
        setUsers(data)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Failed to load users. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading users...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-md">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Expense Management Dashboard</h1>
        <Button asChild>
          <Link to="/register">
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-background/50 backdrop-blur border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Users</CardTitle>
              <div className="text-sm text-muted-foreground">
                Click on a user's name or the "Transactions" button to see their transactions
              </div>
            </CardHeader>
            <CardContent>
              <UserList users={users} setUsers={setUsers} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-background/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle>Average Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpensePieChart users={users} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}