"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";

import ResetPasswordFormContent from "./ResetPasswordFormContent";
import ResetPasswordFormFooter from "./ResetPasswordFormFooter";
import FormCard from "@/components/shared/form/FormCard";

import { resetPasswordAction } from "@/server-actions/auth/reset-password";
import { ResetPasswordSchema } from "@/validations/auth/reset-password";
import { RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";
import { PUBLIC_ROUTES } from "#constants/routes";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      if (!token) {
        setErrorMessage(RESET_PASSWORD_CLIENT.TOKEN_ERROR_DESC);
        return;
      }

      startTransition(async () => {
        const result = await resetPasswordAction(token, value.password);
        if (!result?.isSuccess) {
          setErrorMessage(result?.message || RESET_PASSWORD_CLIENT.FALLBACK_ERROR);
        }

        router.push(PUBLIC_ROUTES.SIGNIN);
      });
    },
  });

  return (
    <FormCard
      title={RESET_PASSWORD_CLIENT.FORM_TITLE}
      description={RESET_PASSWORD_CLIENT.FORM_DESC}
      content={<ResetPasswordFormContent form={form} isSubmitting={isSubmitting} />}
      footer={
        <ResetPasswordFormFooter
          isSubmitting={isSubmitting}
          isDisabled={!!errorMessage}
          errorMessage={errorMessage}
        />
      }
    />
  );
};

export default ResetPasswordForm;
