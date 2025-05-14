"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import UserForm from "../components/UserForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getUserById } from "../lib/api"

export default function EditUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id)
        if (!userData) {
          navigate("/not-found")
          return
        }
        setUser(userData)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError("Failed to load user data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading user data...</p>
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
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="max-w-md mx-auto">
        <Card className="bg-background/50 backdrop-blur border-gray-800">
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
            <CardDescription>Update user information</CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
