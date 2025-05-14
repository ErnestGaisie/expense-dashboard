import * as React from "react"
import { cn } from "../../lib/utils"

const AlertDialog = ({ children, open, onOpenChange }) => {
    const [isOpen, setIsOpen] = React.useState(false)
  
    // Only update when `open` is controlled
    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open)
      }
    }, [open])
  
    const handleOpenChange = (value) => {
      if (open === undefined) {
        setIsOpen(value)
      }
      onOpenChange?.(value)
    }
  
    return (
      <AlertDialogContext.Provider value={{ open: open ?? isOpen, onOpenChange: handleOpenChange }}>
        {children}
      </AlertDialogContext.Provider>
    )
  }
  

const AlertDialogContext = React.createContext({
  open: false,
  onOpenChange: () => {},
})

const AlertDialogTrigger = React.forwardRef(({ className, children, asChild = false, ...props }, ref) => {
    const { onOpenChange } = React.useContext(AlertDialogContext)
  
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        onClick: (e) => {
          children.props.onClick?.(e)
          onOpenChange(true)
        },
        className: cn(children.props.className, className),
        ...props,
      })
    }
  
    return (
      <button
        ref={ref}
        onClick={() => onOpenChange(true)}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  })
  
AlertDialogTrigger.displayName = "AlertDialogTrigger"

const AlertDialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(AlertDialogContext)

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
        {children}
      </div>
    </div>
  )
})
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
))
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
))
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext)

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
})
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext)

  return (
    <button
      ref={ref}
      className={cn(
        "mt-2 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:mt-0",
        className,
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
})
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
