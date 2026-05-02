"use client"

import Link from "next/link"
import { useActionState, useState } from "react"

import { FormInput } from "@/components/shared/FormInput"
import { FormMessage } from "@/components/shared/FormMessage"
import { Button } from "@/components/ui/button"
import { signInAction } from "@/server-actions/auth/actions"

import { AuthSubmitButton } from "./AuthSubmitButton"
import { validateSignIn } from "./validation"

export function SignInForm() {
  const [state, formAction] = useActionState(signInAction, {})
  const [clientError, setClientError] = useState<string | undefined>()

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget)
        const error = validateSignIn({
          email: String(formData.get("email") || "").trim(),
          password: String(formData.get("password") || "").trim(),
        })

        setClientError(error)
        if (error) {
          event.preventDefault()
        }
      }}
      className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm sm:p-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in</h1>
        <p className="text-sm text-white/55">Continue your private listening session.</p>
      </div>

      <div className="space-y-4">
        <FormInput name="email" type="email" label="Email" autoComplete="email" placeholder="you@example.com" required />
        <FormInput
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />
      </div>

      <FormMessage error={clientError ?? state.error} success={state.success} />

      <AuthSubmitButton idleLabel="Sign In" loadingLabel="Signing In..." />

      <div className="flex items-center justify-between gap-3 pt-1 text-xs text-white/50">
        <span>New here?</span>
        <Button render={<Link href="/signup" />} nativeButton={false} variant="ghost" size="xs">
          Create account
        </Button>
      </div>
    </form>
  )
}
