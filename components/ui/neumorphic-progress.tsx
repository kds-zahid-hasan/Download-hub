import * as React from "react"
import { cn } from "@/lib/utils"

interface NeumorphicProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  color?: string
}

const NeumorphicProgress = React.forwardRef<HTMLDivElement, NeumorphicProgressProps>(
  ({ className, value, max = 100, color = "#5b6baa", ...props }, ref) => {
    const percentage = (value / max) * 100

    return (
      <div
        className={cn(
          "h-4 rounded-full bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff] overflow-hidden",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>
    )
  },
)

NeumorphicProgress.displayName = "NeumorphicProgress"

export { NeumorphicProgress }
