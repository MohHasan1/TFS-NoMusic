"use client";

import { useActionState } from "react";

import { FormMessage } from "@/components/shared/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitNoMusicRequestAction } from "@/server-actions/requests/actions";

export function RequestNoMusicForm() {
  const [state, formAction, pending] = useActionState(submitNoMusicRequestAction, {});

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm sm:p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Request NoMusic</h1>
        <p className="text-sm text-white/55">Share the YouTube link and we will review the request.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="youtubeURL" className="text-xs tracking-[0.16em] uppercase text-white/60">
            YouTube URL
          </Label>
          <Input
            id="youtubeURL"
            name="youtubeURL"
            required
            placeholder="https://youtube.com/watch?v=..."
            className="h-10 rounded-xl border-white/15 bg-white/3 text-white placeholder:text-white/35 focus-visible:border-white/35 focus-visible:ring-white/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-xs tracking-[0.16em] uppercase text-white/60">
            Description (optional)
          </Label>
          <textarea
            id="description"
            name="description"
            placeholder="Any extra context for this request"
            className="min-h-28 rounded-xl border border-white/15 bg-white/3 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/35 focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <FormMessage error={state.error} success={state.success} />

      <Button type="submit" size="lg" className="w-full rounded-xl" disabled={pending}>
        {pending ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
