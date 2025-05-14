"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

const Dialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
      if (onOpenChange) onOpenChange(open)
    }
  }, [open, onOpenChange])

  const handleOpenChange = (value) => {
    setIsOpen(value)
    if (onOpenChange) onOpenChange(value)
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>{children}</DialogContext.Provider>
  )
}

const DialogContext = React.createContext({
  open: false,
  onOpenChange: () => {},
})

const DialogTrigger = React.forwardRef(({ className, children, asChild = false, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DialogContext)
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp ref={ref} onClick={() => onOpenChange(true)} className={className} {...props}>
      {children}
    </Comp>
  )
})
DialogTrigger.displayName = "DialogTrigger"

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(DialogContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={ref}
        className={cn(
          "fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg sm:rounded-lg md:w-full",
          className,
        )}
        {...props}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
))
DialogHeader.displayName = "DialogHeader"

const DialogFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
))
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = "DialogDescription"

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription }
