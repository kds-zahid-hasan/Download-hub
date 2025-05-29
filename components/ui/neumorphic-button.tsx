import * as React from "react"
import { cn } from "@/lib/utils"

interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg" | "icon"
  isActive?: boolean
  children: React.ReactNode
}

const NeumorphicButton = React.forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  ({ className, variant = "primary", size = "md", isActive = false, children, ...props }, ref) => {
    const baseStyles = "rounded-xl font-medium transition-all duration-300 focus:outline-none"

    const variantStyles = {
      primary: "bg-[#e0e5ec] text-[#5b6baa]",
      secondary: "bg-[#e0e5ec] text-[#8a96a8]",
      outline: "bg-[#e0e5ec] text-[#6d7b92] border border-[#d0d5dc]",
      ghost: "bg-transparent text-[#6d7b92] hover:bg-[#e9ecf3]",
    }

    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "px-4 py-2",
      lg: "text-lg px-6 py-3",
      icon: "p-2",
    }

    const shadowStyles = isActive
      ? "shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff]"
      : "shadow-[5px_5px_10px_#b8bec5,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_6px_#b8bec5,-3px_-3px_6px_#ffffff] active:shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff]"

    return (
      <button
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], shadowStyles, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

NeumorphicButton.displayName = "NeumorphicButton"

export { NeumorphicButton }
