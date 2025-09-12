import { cn } from "@/lib/utils"
import { CircleAlert } from 'lucide-react'

export default function ErrorInputMessage({ className, message, ...props }) {
  if (!message) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      className={cn(
        'text-muted-foreground data-[error=true]:text-destructive text-sm flex items-center',
        className
      )}
      style={{
        wordBreak: 'break-word',
      }}
      data-error={true}
      {...props}
    >
      <CircleAlert className="mr-1" /> {message}
    </p>
  )
}