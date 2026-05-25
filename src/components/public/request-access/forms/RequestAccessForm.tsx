"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useTransition } from "react";

import FormCard from "@/components/shared/form/FormCard";
import { REQUEST_ACCESS_CLIENT } from "@/constants/public/request-access";
import { requestAccessAction } from "@/server-actions/public/request-access";
import { RequestAccessSchema } from "@/validations/public/request-access";
import RequestAccessFormContent from "./RequestAccessFormContent";
import RequestAccessFormFooter from "./RequestAccessFormFooter";

const RequestAccessForm = () => {
  const [isSubmitting, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validators: {
      onSubmit: RequestAccessSchema,
    },
    onSubmitInvalid: () => {
      setErrorMessage("");
      setSuccessMessage("");
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await requestAccessAction(value);

        if (!result?.isSuccess) {
          setSuccessMessage("");
          setErrorMessage(result?.message || REQUEST_ACCESS_CLIENT.FALLBACK_CLIENT_ERROR);
          return;
        }

        setErrorMessage("");
        setSuccessMessage(REQUEST_ACCESS_CLIENT.SUCCESS_SUBMIT_MSG);
        form.reset();
      });
    },
  });

  return (
    <FormCard
      title={REQUEST_ACCESS_CLIENT.FORM_TITLE}
      description={REQUEST_ACCESS_CLIENT.FORM_DESC}
      content={
        <RequestAccessFormContent
          form={form}
          isSubmitting={isSubmitting}
          clearMessagesFn={() => {
            setErrorMessage("");
            setSuccessMessage("");
          }}
        />
      }
      footer={
        <RequestAccessFormFooter
          isSubmitting={isSubmitting}
          errorMsg={errorMessage}
          successMsg={successMessage}
        />
      }
    />
  );
};

export default RequestAccessForm;
