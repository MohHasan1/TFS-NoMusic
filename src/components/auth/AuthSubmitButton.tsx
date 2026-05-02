"use client"

import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

type AuthSubmitButtonProps = {
  idleLabel: string
  loadingLabel: string
}

export function AuthSubmitButton({
  idleLabel,
  loadingLabel,
}: AuthSubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full rounded-xl"
      disabled={pending}
    >
      {pending ? loadingLabel : idleLabel}
    </Button>
  )
}
