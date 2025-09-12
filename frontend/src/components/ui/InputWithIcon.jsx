import * as React from 'react'
import { cn } from "@/lib/utils"

function InputWithIcon({ className, type, prefixIcon, isInvalid, ...props }) {
  return (
    <div
      className={cn(
        'flex h-9 w-full items-center rounded-md border border-gray-300 bg-transparent shadow-xs transition-all',
        'focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed dark:bg-input/30',
        className
      )}
      aria-invalid={isInvalid}
    >
      {prefixIcon && (
        <span className="rounded-l-md text-black h-full ps-3 text-base flex items-center">
          {prefixIcon}
        </span>
      )}
      <input
        type="text"
        data-slot="input"
        className="px-3 py-1 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground disabled:opacity-50 md:text-sm"
        {...props}
      />
    </div>
  )
}

export { InputWithIcon }