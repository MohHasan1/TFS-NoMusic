"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { verifyEmailAction } from "@/server-actions/auth/verify-email";
import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";

import FormCard from "@/components/shared/form/FormCard";
import VerifyEmailContent from "./VerifyEmailContent";
import { PUBLIC_ROUTES } from "#constants/routes";
import { TokenSchema } from "@/validations/auth/token";

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    verify();
  }, [token]);

  const verify = async () => {
    const validatedData = TokenSchema.safeParse({ token });
    if (!validatedData.success) {
      setStatus("error");
      return;
    }

    const result = await verifyEmailAction(validatedData.data.token);
    if (!result.isSuccess) {
      setStatus("error");
      return;
    }
    
    setStatus("success");
    setTimeout(() => {
      redirect(PUBLIC_ROUTES.SIGNIN, "replace");
    }, 3000);
  };

  const getTitle = () => {
    if (status === "loading") return VERIFY_EMAIL_CLIENT.LOADING_TITLE;
    if (status === "success") return VERIFY_EMAIL_CLIENT.SUCCESS_TITLE;
    return VERIFY_EMAIL_CLIENT.ERROR_TITLE;
  };

  const getDescription = () => {
    if (status === "loading") return VERIFY_EMAIL_CLIENT.LOADING_DESC;
    if (status === "success") return VERIFY_EMAIL_CLIENT.SUCCESS_DESC;
    return VERIFY_EMAIL_CLIENT.ERROR_DESC;
  };

  return (
    <FormCard
      title={getTitle()}
      description={getDescription()!}
      content={<VerifyEmailContent status={status} />}
    />
  );
};

export default VerifyEmailForm;
