import { Link } from "react-router-dom"
import UserForm from "../components/UserForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {
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
            <CardTitle>User Registration</CardTitle>
            <CardDescription>Create a new user account to track expenses and income</CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
