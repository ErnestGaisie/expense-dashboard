import * as React from "react"
import { Controller, FormProvider, useFormContext } from "react-hook-form"
import { Label } from "./label"
import { cn } from "../../lib/utils"

const Form = FormProvider

const FormField = ({ name, ...props }) => {
  const { control } = useFormContext()
  return <Controller name={name} control={control} {...props} />
}

const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
))
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => <div ref={ref} className="mt-2" {...props} />)
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error } = props
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
