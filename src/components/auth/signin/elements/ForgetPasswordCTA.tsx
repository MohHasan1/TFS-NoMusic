import { forgotPasswordAction } from "@/server-actions/auth/forgot-password";
import { TSigninSchema } from "@/validations/auth/signin";

import FormCTA from "@/components/shared/form/FormCTA";
import { PUBLIC_ROUTES } from "#constants/routes";
import { TForm } from "#types/form";

import { redirect } from "next/navigation";
import { toast } from "sonner";

const ForgetPasswordCTA = ({ form, isSubmitting }: TProps) => {
  const handleForgotPassword = async () => {
    form.setFieldMeta("password", (prev) => ({
      ...prev,
      isTouched: false,
    }));

    const validation = await form.validateField("email", "submit");
    if (validation.length > 0) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const email = form.getFieldValue("email");
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }

    toast.info(`Sending magic link to ${email}...`);

    const result = await forgotPasswordAction(email);
    if (result.isSuccess) {
      toast.success(result.message);
      redirect(PUBLIC_ROUTES.CHECK_EMAIL);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <FormCTA
      label={"Forgot your password?"}
      linkLabel={"HALPPPP!!"}
      isSubmitting={isSubmitting}
      onClick={handleForgotPassword}
    />
  );
};

export default ForgetPasswordCTA;

type TProps = {
  form: TForm<TSigninSchema>;
  isSubmitting: boolean;
};
