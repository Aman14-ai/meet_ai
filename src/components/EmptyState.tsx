import { AlertCircle } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

const EmptyState = ({ title, description, actionLabel, onAction }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center py-16 px-6">
      <div className="flex flex-col items-center justify-center gap-6 text-center bg-card rounded-2xl shadow-md border border-border p-12 max-w-lg w-full transition hover:shadow-lg">
        {/* Icon */}
        <div className="flex items-center justify-center rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>

        {/* Title + description */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Optional action */}
        {actionLabel && onAction && (
          <Button onClick={onAction} className="rounded-xl">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmptyState
