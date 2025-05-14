import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { createUser, updateUser } from "../lib/api"

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function UserForm({ user }) {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Default values for the form
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
  }

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  })

  async function onSubmit(data) {
    setIsSubmitting(true)

    try {
      if (user) {
        // Update existing user
        await updateUser(user._id, data)
      } else {
        // Create new user
        await createUser(data)
      }
      navigate("/")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="bg-background/50 border-gray-800" />
              </FormControl>
              <FormDescription>Enter your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  type="email"
                  {...field}
                  className="bg-background/50 border-gray-800"
                />
              </FormControl>
              <FormDescription>Enter a valid email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="bg-background/50 border-gray-800"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : user ? "Update User" : "Register User"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
