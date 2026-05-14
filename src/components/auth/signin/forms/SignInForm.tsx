"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { redirect } from "next/navigation";

import FormCard from "@/components/shared/form/FormCard";
import SigninFormContent from "./SigninFormContent";
import SigninFormFooter from "./SigninFormFooter";

import { SigninSchema, SigninStrictSchema } from "@/validations/auth/signin";
import { signinAction } from "@/server-actions/auth/signin";
import { SIGNIN_CLIENT } from "#constants/auth/signin";
import { PRIVATE_ROUTES } from "#constants/routes";

const SigninForm = () => {
  const [isSubmitting, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const [serverError, setServerError] = useState<TError[]>([]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: SigninSchema,
    },
    onSubmitInvalid: () => {
      setErrorMessage("");
    },
    onSubmit: ({ value }) => {
      // NOTE: This is a manual validation of the password field:
      const manVal = SigninStrictSchema.safeParse(value);
      if (!manVal.success) {
        setErrorMessage(SIGNIN_CLIENT.WRONG_CREDENTIALS_MSG);
        return;
      }
      startTransition(async () => {
        const result = await signinAction(value);
        if (!result?.isSuccess) {
          setErrorMessage(result?.message || SIGNIN_CLIENT.FALLBACK_ERROR);
          return;
        }
        redirect(PRIVATE_ROUTES.NOMUSIC);
      });
    },
  });

  return (
    <FormCard
      title={SIGNIN_CLIENT.FORM_TITLE}
      description={SIGNIN_CLIENT.FORM_DESC}
      content={
        <SigninFormContent
          form={form}
          isSubmitting={isSubmitting}
          clearErrorFn={() => setErrorMessage("")}
        />
      }
      footer={<SigninFormFooter isSubmitting={isSubmitting} errorMsg={errorMessage} />}
    />
  );
};

export default SigninForm;
