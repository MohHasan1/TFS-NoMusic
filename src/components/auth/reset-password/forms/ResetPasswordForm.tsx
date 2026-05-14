"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import FormCard from "@/components/shared/form/FormCard";
import ResetPasswordFormContent from "./ResetPasswordFormContent";
import ResetPasswordFormFooter from "./ResetPasswordFormFooter";

import { resetPasswordAction } from "@/server-actions/auth/reset-password";
import { ResetPasswordSchema } from "@/validations/auth/reset-password";
import { RESET_PASSWORD_CLIENT } from "#constants/auth/reset-password";
import { PUBLIC_ROUTES } from "#constants/routes";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isSubmitting, startTransition] = useTransition();
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

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
        toast.error("Reset token is missing or invalid.");
        return;
      }

      startTransition(async () => {
        const result = await resetPasswordAction(token, value.password);
        if (!result?.isSuccess) {
          setServerErrorMessage(result?.message || RESET_PASSWORD_CLIENT.FALLBACK_ERROR);
          toast.error(result?.message || RESET_PASSWORD_CLIENT.FALLBACK_ERROR);
        } else {
          setServerErrorMessage("");
          toast.success(result.message);
          router.push(PUBLIC_ROUTES.SIGNIN);
        }
      });
    },
  });

  return (
    <FormCard
      title={RESET_PASSWORD_CLIENT.FORM_TITLE}
      description={RESET_PASSWORD_CLIENT.FORM_DESC}
      content={<ResetPasswordFormContent form={form} isSubmitting={isSubmitting} />}
      footer={<ResetPasswordFormFooter isSubmitting={isSubmitting} errorMsg={serverErrorMessage} />}
    />
  );
};

export default ResetPasswordForm;
