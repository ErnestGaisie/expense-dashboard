import { useState } from "react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { deleteTransaction } from "../lib/api"
import { formatCurrency, formatDate } from "../lib/utils"
import TransactionForm from "./TransactionForm"

export default function TransactionList({ userId, transactions, setTransactions }) {
  const [editingTransaction, setEditingTransaction] = useState(null)

  const handleDeleteTransaction = async (transactionId) => {
    // Optimistic update
    setTransactions(transactions.filter((t) => t._id !== transactionId))

    // API call
    await deleteTransaction(userId, transactionId)
  }

  const handleTransactionUpdated = (updatedTransaction) => {
    setTransactions(transactions.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t)))
    setEditingTransaction(null)
  }

  return (
    <div>
      {transactions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No transactions found. Add a new transaction to get started.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    {transaction.description || "No description"}
                  </div>
                </TableCell>
                <TableCell>
                  {transaction.category ? (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-background/80 border border-gray-800">
                      {transaction.category}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell
                  className={`text-right ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditingTransaction(transaction)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
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
                            This will permanently delete this transaction. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-background/50 border-gray-800">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTransaction(transaction._id)}
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

      {/* Edit Transaction Dialog */}
      <Dialog open={!!editingTransaction} onOpenChange={(open) => !open && setEditingTransaction(null)}>
        <DialogContent className="bg-background/95 backdrop-blur border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <TransactionForm userId={userId} transaction={editingTransaction} onSuccess={handleTransactionUpdated} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
