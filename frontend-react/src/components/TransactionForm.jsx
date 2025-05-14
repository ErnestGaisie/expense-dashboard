import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { createTransaction, updateTransaction } from "../lib/api";

// Categories for expenses
const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Personal Care",
  "Education",
  "Travel",
  "Gifts & Donations",
  "Other",
];

const transactionFormSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  category: z.string().optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
});

export default function TransactionForm({ userId, transaction, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default values for the form
  const defaultValues = {
    type: transaction?.type || "expense",
    amount: transaction?.amount || undefined,
    description: transaction?.description || "",
    category: transaction?.category || undefined,
    date: transaction?.date
      ? new Date(transaction.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  };

  const form = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues,
  });

  // Watch the transaction type to conditionally show category field
  const transactionType = form.watch("type");

  async function onSubmit(data) {
    setIsSubmitting(true);

    try {
      if (data.type === "income") {
        data.category = "income";
      }

      let result;
      if (transaction) {
        // Update existing transaction
        result = await updateTransaction(userId, transaction._id, data);
      } else {
        // Create new transaction
        console.log("DD", data);
        result = await createTransaction(userId, data);
        form.reset(defaultValues); // Reset form after successful creation
      }

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <RadioGroup className="flex flex-row gap-4">
                  {["income", "expense"].map((value) => (
                    <RadioGroupItem
                      key={value}
                      value={value}
                      checked={field.value === value}
                      onChange={() => field.onChange(value)}
                    >
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                  className="bg-background/50 border-gray-800"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the transaction amount.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Grocery shopping"
                  className="bg-background/50 border-gray-800"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a brief description of the transaction.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {transactionType === "expense" && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-background/50 border-gray-800"
                  >
                    <option value="">Select a category</option>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </Select>
                </FormControl>
                <FormDescription>
                  Select a category for this expense.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className="bg-background/50 border-gray-800"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the date of the transaction.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-2">
          {transaction && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess?.(transaction)}
              className="bg-background/50 border-gray-800"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : transaction
              ? "Update"
              : "Add Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
