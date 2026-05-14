import { CHECK_EMAIL_CLIENT } from "@/constants/auth/check-email";

const CheckEmailContent = () => {
  return (
    <div className="py-4 text-sm text-primary-200 text-center leading-relaxed">
      {CHECK_EMAIL_CLIENT.CONTENT_DESC}
    </div>
  );
};

export default CheckEmailContent;
