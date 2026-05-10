"use client";

import Link from "next/link";
import { useActionState } from "react";

import { FormAlert } from "@/components/shared/form/FormAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitRequestAccessAction } from "@/server-actions/requests/actions";

export function RequestAccessForm() {
  const [state, formAction, pending] = useActionState(submitRequestAccessAction, {});

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm sm:p-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Request app access</h1>
        <p className="text-sm text-white/55">
          Share why you want access and we will review your request.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-xs tracking-[0.16em] uppercase text-white/60">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-10 rounded-xl border-white/15 bg-white/3 text-white placeholder:text-white/35 focus-visible:border-white/35 focus-visible:ring-white/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-xs tracking-[0.16em] uppercase text-white/60">
            Why do you need access? (optional)
          </Label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us why you need access..."
            className="min-h-28 rounded-xl border border-white/15 bg-white/3 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/35 focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <FormAlert error={state.error} success={state.success} />

      <Button type="submit" size="lg" className="w-full rounded-xl" disabled={pending}>
        {pending ? "Submitting..." : "Submit Access Request"}
      </Button>

      <div className="flex items-center justify-between gap-3 pt-1 text-xs text-white/50">
        <span>Already have access?</span>
        <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" size="xs">
          Sign in
        </Button>
      </div>
    </form>
  );
}
