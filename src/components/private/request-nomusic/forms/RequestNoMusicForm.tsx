"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useTransition } from "react";

import { REQUEST_NOMUSIC_CLIENT } from "#constants/private/request-nomusic";
import { submitNoMusicRequestAction } from "#server-actions/private/request-nomusic";
import { RequestNoMusicSchema } from "#validations/private/request-nomusic";
import FormCard from "@/components/shared/form/FormCard";

import RequestNoMusicFormFooter from "./RequestNoMusicFormFooter";
import RequestNoMusicFormContent from "./RequestNoMusicFormContent";

export function RequestNoMusicForm() {
  const [isSubmitting, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm({
    defaultValues: {
      youtubeURL: "",
    },
    validators: {
      onSubmit: RequestNoMusicSchema,
    },
    onSubmitInvalid: () => {
      setErrorMessage("");
      setSuccessMessage("");
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await submitNoMusicRequestAction(value);

        if (!result?.isSuccess) {
          setSuccessMessage("");
          setErrorMessage(result?.message || REQUEST_NOMUSIC_CLIENT.FALLBACK_ERROR);
          return;
        }

        setErrorMessage("");
        setSuccessMessage(result.message || REQUEST_NOMUSIC_CLIENT.SUCCESS_SUBMIT_MSG);
        form.reset();
      });
    },
  });

  return (
    <FormCard
      title={REQUEST_NOMUSIC_CLIENT.FORM_TITLE}
      description={REQUEST_NOMUSIC_CLIENT.FORM_DESC}
      content={
        <RequestNoMusicFormContent
          form={form}
          isSubmitting={isSubmitting}
          clearMessagesFn={() => {
            setErrorMessage("");
            setSuccessMessage("");
          }}
        />
      }
      footer={
        <RequestNoMusicFormFooter
          errorMsg={errorMessage}
          successMsg={successMessage}
          isSubmitting={isSubmitting}
        />
      }
    />
  );
}
