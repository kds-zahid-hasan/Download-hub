import * as React from "react"
import { cn } from "@/lib/utils"

interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "raised" | "pressed" | "flat"
  children: React.ReactNode
}

const NeumorphicCard = React.forwardRef<HTMLDivElement, NeumorphicCardProps>(
  ({ className, variant = "raised", children, ...props }, ref) => {
    const baseStyles = "bg-[#e0e5ec] rounded-2xl"

    const variantStyles = {
      raised: "shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]",
      pressed: "shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff]",
      flat: "border border-[#d0d5dc]",
    }

    return (
      <div className={cn(baseStyles, variantStyles[variant], className)} ref={ref} {...props}>
        {children}
      </div>
    )
  },
)

NeumorphicCard.displayName = "NeumorphicCard"

export { NeumorphicCard }
