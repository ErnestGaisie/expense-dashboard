import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import TransactionList from "../components/TransactionList"
import TransactionForm from "../components/TransactionForm"
import { getUserWithTransactions } from "../lib/api"
import { ArrowLeft } from "lucide-react"

export default function TransactionsPage() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserWithTransactions = async () => {
      try {
        const userData = await getUserWithTransactions(id)
        setUser(userData)
      } catch (err) {
        console.error("Error fetching user with transactions:", err)
        setError("Failed to load user data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserWithTransactions()
  }, [id])

  const handleTransactionAdded = (newTransaction) => {
    setUser((prevUser) => ({
      ...prevUser,
      transactions: [...(prevUser.transactions || []), newTransaction],
    }))
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading transactions...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-md">
          <p>{error || "User not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{user.name}'s Transactions</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-background/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList
                userId={user._id}
                transactions={user.transactions || []}
                setTransactions={(transactions) => {
                  setUser((prev) => ({ ...prev, transactions }))
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-background/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm userId={user._id} onSuccess={handleTransactionAdded} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
