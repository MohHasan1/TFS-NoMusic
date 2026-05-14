"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import FormCard from "@/components/shared/form/FormCard";
import ForgotPasswordFormContent from "./ForgotPasswordFormContent";
import ForgotPasswordFormFooter from "./ForgotPasswordFormFooter";

import { forgotPasswordAction } from "@/server-actions/auth/forgot-password";
import { ForgotPasswordSchema } from "@/validations/auth/forgot-password";
import { FORGOT_PASSWORD_CLIENT } from "#constants/auth/forgot-password";
import { useRouter } from "next/navigation";
import { PUBLIC_ROUTES } from "#constants/routes";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isSubmitting, startTransition] = useTransition();
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: ForgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await forgotPasswordAction(value.email);
        if (!result?.isSuccess) {
          setServerErrorMessage(result?.message || FORGOT_PASSWORD_CLIENT.FALLBACK_ERROR);
          toast.error(result?.message || FORGOT_PASSWORD_CLIENT.FALLBACK_ERROR);
        } else {
          setServerErrorMessage("");
          toast.success(result.message);
          router.push(PUBLIC_ROUTES.CHECK_EMAIL);
        }
      });
    },
  });

  return (
    <FormCard
      title={FORGOT_PASSWORD_CLIENT.FORM_TITLE}
      description={FORGOT_PASSWORD_CLIENT.FORM_DESC}
      content={<ForgotPasswordFormContent form={form} isSubmitting={isSubmitting} />}
      footer={<ForgotPasswordFormFooter isSubmitting={isSubmitting} errorMsg={serverErrorMessage} />}
    />
  );
};

export default ForgotPasswordForm;
