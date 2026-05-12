import { CHECK_EMAIL_CLIENT } from "@/constants/auth/check-email";

const CheckEmailContent = () => {
  return (
    <div className="py-4 text-sm text-white/70 leading-relaxed">{CHECK_EMAIL_CLIENT.HELP_TEXT}</div>
  );
};

export default CheckEmailContent;
