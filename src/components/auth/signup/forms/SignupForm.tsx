"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import FormCard from "@/components/shared/form/FormCard";
import SignupFormContent from "./SignupFormContent";
import SignupFormFooter from "./SignupFormFooter";

import { signupAction } from "@/server-actions/auth/signup";
import { SignupSchema } from "@/validations/auth/signup";
import { SIGNUP_CLIENT } from "#constants/auth/signup";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  // const [serverError, setServerError] = useState<TError[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: SignupSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await signupAction(value);
        if (!result?.isSuccess) {
          // setServerError(result?.error || []);
          setServerErrorMessage(result?.message || SIGNUP_CLIENT.FALLBACK_ERROR);
          toast.error(result?.message || SIGNUP_CLIENT.FALLBACK_ERROR);
        }
      });
    },
  });

  return (
    <FormCard
      title={SIGNUP_CLIENT.FORM_TITLE}
      description={SIGNUP_CLIENT.FORM_DESC}
      content={<SignupFormContent form={form} />}
      footer={<SignupFormFooter isPending={isPending} errorMsg={serverErrorMessage} />}
    />
  );
};

export default SignupForm;
