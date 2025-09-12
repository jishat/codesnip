import { cn } from "@/lib/utils"
import { CircleAlert, CircleCheck } from 'lucide-react'

export default function SuccessMessage({ className, message, ...props }) {
  if (!message) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      className={cn(
        'text-muted-foreground text-green-500 text-sm flex items-center',
        className
      )}
      data-error={true}
      {...props}
    >
      <CircleCheck className="mr-1" /> {message}
    </p>
  )
}