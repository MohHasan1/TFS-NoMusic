import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormInputProps = {
  name: string
  type?: "text" | "email" | "password"
  label: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
}

export function FormInput({
  name,
  type = "text",
  label,
  placeholder,
  autoComplete,
  required,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-xs tracking-[0.16em] uppercase text-white/60">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="h-10 rounded-xl border-white/15 bg-white/3 text-white placeholder:text-white/35 focus-visible:border-white/35 focus-visible:ring-white/20"
      />
    </div>
  )
}
