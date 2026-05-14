"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { verifyEmailAction } from "@/server-actions/auth/verify-email";
import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";

import FormCard from "@/components/shared/form/FormCard";
import VerifyEmailContent from "./VerifyEmailContent";
import { VerifyEmailSchema } from "@/validations/auth/verify-email";
import { PUBLIC_ROUTES } from "#constants/routes";

const VerifyEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("success");

  useEffect(() => {
    // verify();
  }, [token]);

  const verify = async () => {
    if (!token) {
      setStatus("error");
      return;
    }

    const validatedData = VerifyEmailSchema.safeParse({ token });
    if (!validatedData.success) {
      setStatus("error");
      return;
    }

    const result = await verifyEmailAction(validatedData.data.token);

    if (!result.isSuccess) {
      setStatus("error");
    } else {
      setStatus("success");
      setTimeout(() => {
        router.push(PUBLIC_ROUTES.SIGNIN);
      }, 3000);
    }
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
