"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";

import FormCard from "@/components/shared/form/FormCard";
import SignupFormContent from "./SignupFormContent";
import SignupFormFooter from "./SignupFormFooter";

import { signupAction } from "#server-actions/auth/signup";
import { SignupSchema } from "#validations/auth/signup";
import { SIGNUP_CLIENT } from "#constants/auth/signup";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    onSubmitInvalid: () => {
      setErrorMessage("");
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await signupAction(value);
        if (!result?.isSuccess) {
          setErrorMessage(result?.message || SIGNUP_CLIENT.FALLBACK_CLIENT_ERROR);
        }
      });
    },
  });

  return (
    <FormCard
      title={SIGNUP_CLIENT.FORM_TITLE}
      description={SIGNUP_CLIENT.FORM_DESC}
      content={<SignupFormContent form={form} isSubmitting={isPending} />}
      footer={<SignupFormFooter isSubmitting={isPending} errorMsg={errorMessage} />}
    />
  );
};

export default SignupForm;
