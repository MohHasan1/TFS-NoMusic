import { Badge } from "@/components/ui/badge"

type FormMessageProps = {
  error?: string
  success?: string
}

export function FormMessage({ error, success }: FormMessageProps) {
  if (!error && !success) {
    return null
  }

  const variant = error ? "destructive" : "secondary"
  const message = error ?? success

  return (
    <Badge variant={variant} className="h-auto py-1.5 text-xs">
      {message}
    </Badge>
  )
}
