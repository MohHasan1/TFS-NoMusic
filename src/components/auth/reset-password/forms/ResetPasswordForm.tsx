"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";

import ResetPasswordFormContent from "./ResetPasswordFormContent";
import ResetPasswordFormFooter from "./ResetPasswordFormFooter";
import FormCard from "@/components/shared/form/FormCard";

import { resetPasswordAction } from "@/server-actions/auth/reset-password";
import { ResetPasswordSchema } from "@/validations/auth/reset-password";
import { RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";
import { PUBLIC_ROUTES } from "#constants/routes";
import { TokenSchema } from "@/validations/auth/token";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  // TODO: const the token
  const token = searchParams.get("token");

  const [isSubmitting, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: ResetPasswordSchema,
    },
    onSubmit: ({ value }) => {
      const validation = TokenSchema.safeParse({ token });
      if (!validation.success) {
        setErrorMessage(RESET_PASSWORD_CLIENT.TOKEN_ERROR_DESC);
        return;
      }

      startTransition(async () => {
        const result = await resetPasswordAction(value, validation.data.token);
        if (!result?.isSuccess) {
          setErrorMessage(result?.message || RESET_PASSWORD_CLIENT.FALLBACK_CLIENT_ERROR);
          return;
        }

        redirect(PUBLIC_ROUTES.SIGNIN);
      });
    },
  });

  return (
    <FormCard
      title={RESET_PASSWORD_CLIENT.FORM_TITLE}
      description={RESET_PASSWORD_CLIENT.FORM_DESC}
      content={
        <ResetPasswordFormContent
          form={form}
          isSubmitting={isSubmitting}
          isDisabled={!!errorMessage}
        />
      }
      footer={
        <ResetPasswordFormFooter
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          isDisabled={!!errorMessage}
        />
      }
    />
  );
};

export default ResetPasswordForm;
