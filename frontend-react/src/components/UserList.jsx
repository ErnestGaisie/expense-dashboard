"use client"

import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Pencil, Trash2, CreditCard } from "lucide-react"
import { deleteUser } from "../lib/api"
import { formatCurrency } from "../lib/utils"

export default function UserList({ users, setUsers }) {
  const handleDeleteUser = async (userId) => {
    // Optimistic update
    setUsers(users.filter((user) => user._id !== userId))

    // API call
    await deleteUser(userId)
  }

  return (
    <div>
      {users.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No users found. Add a new user to get started.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Total Income</TableHead>
              <TableHead className="text-right">Total Expense</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  <Link to={`/users/${user._id}/transactions`} className="hover:underline">
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell className="text-right text-green-500">{formatCurrency(user.totalIncome || 0)}</TableCell>
                <TableCell className="text-right text-red-500">{formatCurrency(user.totalExpense || 0)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild className="bg-background/50 border-gray-800">
                      <Link to={`/users/${user._id}/transactions`} className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Transactions</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/users/${user._id}/edit`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-background/95 backdrop-blur border-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {user.name}'s account and all associated transactions. This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-background/50 border-gray-800">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
