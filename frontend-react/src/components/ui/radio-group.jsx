import * as React from "react"
import { cn } from "../../lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return <div className={cn("flex flex-col gap-2", className)} ref={ref} {...props} />
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        className={cn(
          "h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-ring",
          className,
        )}
        ref={ref}
        {...props}
      />
      {children}
    </label>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
