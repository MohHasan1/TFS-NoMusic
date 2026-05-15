"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { redirect } from "next/navigation";

import ForgotPasswordFormContent from "./ForgotPasswordFormContent";
import ForgotPasswordFormFooter from "./ForgotPasswordFormFooter";
import FormCard from "@/components/shared/form/FormCard";

import { forgotPasswordAction } from "#server-actions/auth/forgot-password";
import { FORGOT_PASSWORD_CLIENT } from "#constants/auth/forgot-password";
import { ForgotPasswordSchema } from "#validations/auth/forgot-password";
import { PUBLIC_ROUTES } from "#constants/routes";

const ForgotPasswordForm = () => {
  const [isSubmitting, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: ForgotPasswordSchema,
    },
    onSubmitInvalid() {
      setErrorMessage("");
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await forgotPasswordAction(value);
        if (!result?.isSuccess) {
          setErrorMessage(result?.message || FORGOT_PASSWORD_CLIENT.FALLBACK_ERROR);
          return;
        }
        redirect(PUBLIC_ROUTES.CHECK_EMAIL);
      });
    },
  });

  return (
    <FormCard
      title={FORGOT_PASSWORD_CLIENT.FORM_TITLE}
      description={FORGOT_PASSWORD_CLIENT.FORM_DESC}
      content={
        <ForgotPasswordFormContent
          form={form}
          isSubmitting={isSubmitting}
          clearErrorFn={() => setErrorMessage("")}
        />
      }
      footer={<ForgotPasswordFormFooter isSubmitting={isSubmitting} errorMsg={errorMessage} />}
    />
  );
};

export default ForgotPasswordForm;
