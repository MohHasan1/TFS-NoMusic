"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { FormInput } from "@/components/shared/FormInput";
import { FormAlert } from "@/components/shared/form/FormAlert";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/server-actions/auth/actions";

import { AuthSubmitButton } from "./AuthSubmitButton";
import { validateSignUp } from "./validation";

export function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, {});
  const [clientError, setClientError] = useState<string | undefined>();

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const error = validateSignUp({
          fullName: String(formData.get("fullName") || "").trim(),
          email: String(formData.get("email") || "").trim(),
          password: String(formData.get("password") || "").trim(),
        });

        setClientError(error);
        if (error) {
          event.preventDefault();
        }
      }}
      className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm sm:p-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Sign up</h1>
        <p className="text-sm text-white/55">Request your place in the private stream.</p>
      </div>

      <div className="space-y-4">
        <FormInput
          name="fullName"
          type="text"
          label="Full Name"
          autoComplete="name"
          placeholder="Your full name"
          required
        />
        <FormInput
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
        />
      </div>

      <FormAlert title="Sign Up" errorMsg={clientError ?? state.error} successMsg={state.success} />

      <AuthSubmitButton idleLabel="Create Account" loadingLabel="Creating..." />

      <div className="flex items-center justify-between gap-3 pt-1 text-xs text-white/50">
        <span>Already have access?</span>
        <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" size="xs">
          Sign in
        </Button>
      </div>
    </form>
  );
}
