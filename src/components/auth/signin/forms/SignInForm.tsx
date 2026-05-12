"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import FormCard from "@/components/shared/form/FormCard";
import SigninFormContent from "./SigninFormContent";
import SigninFormFooter from "./SigninFormFooter";

import { signinAction } from "@/server-actions/auth/signin";
import { SigninSchema } from "@/validations/auth/signin";
import { SIGNIN_CLIENT } from "#constants/auth/signin";

const SigninForm = () => {
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
          setServerErrorMessage(result?.message || SIGNIN_CLIENT.FALLBACK_ERROR);
          toast.error(result?.message || SIGNIN_CLIENT.FALLBACK_ERROR);
        }
      });
    },
  });

  return (
    <FormCard
      title={SIGNIN_CLIENT.FORM_TITLE}
      description={SIGNIN_CLIENT.FORM_DESC}
      content={<SigninFormContent form={form} />}
      footer={<SigninFormFooter isPending={isPending} errorMsg={serverErrorMessage} />}
    />
  );
};

export default SigninForm;
