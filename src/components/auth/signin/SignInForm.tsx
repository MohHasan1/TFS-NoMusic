"use client";

import FormCard from "@/components/shared/form/FormCard";
import { useForm } from "@tanstack/react-form";

import { useState, useTransition } from "react";
import { signinAction } from "@/server-actions/auth/signin";
import { toast } from "sonner";
import { SigninSchema } from "@/validations/auth";
import SigninFormFooter from "./SigninFormFooter";
import SigninFormContent from "./SigninFormContent";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  // const [serverError, setServerError] = useState<TError[]>([]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: SigninSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await signinAction(value);
        if (!result?.isSuccess) {
          // setServerError(result?.error || []);
          setServerErrorMessage(result?.message || "An error occurred");
          toast.error(result?.message || "An error occurred", { position: "top-right" });
        }
      });
    },
  });

  return (
    <FormCard
      title="Sign in"
      description="Continue your private listening session."
      content={<SigninFormContent form={form} />}
      footer={<SigninFormFooter isPending={isPending} error={serverErrorMessage} />}
    />
  );
}
