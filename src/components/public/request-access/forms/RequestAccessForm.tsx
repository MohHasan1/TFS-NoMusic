"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import FormCard from "@/components/shared/form/FormCard";
import { REQUEST_ACCESS_CLIENT } from "@/constants/public/request-access";
import RequestAccessFormContent from "./RequestAccessFormContent";
import RequestAccessFormFooter from "./RequestAccessFormFooter";
import { RequestAccessSchema } from "@/validations/public/request-access";
import { requestAccessAction } from "@/server-actions/public/request-access";

const RequestAccessForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  // const [serverError, setServerError] = useState<TError[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validators: {
      onSubmit: RequestAccessSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await requestAccessAction(value);
        if (!result?.isSuccess) {
          // setServerError(result?.error || []);
          setServerErrorMessage(result?.message || REQUEST_ACCESS_CLIENT.FALLBACK_ERROR);
          toast.error(result?.message || REQUEST_ACCESS_CLIENT.FALLBACK_ERROR);
        }
      });
    },
  });

  return (
    <FormCard
      title={REQUEST_ACCESS_CLIENT.FORM_TITLE}
      description={REQUEST_ACCESS_CLIENT.FORM_DESC}
      content={<RequestAccessFormContent form={form} />}
      footer={<RequestAccessFormFooter isPending={isPending} errorMsg={serverErrorMessage} />}
    />
  );
};

export default RequestAccessForm;
