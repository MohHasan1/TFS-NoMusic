import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";
import { Spinner } from "@/components/ui/spinner";
import ProgressBar from "@/components/shared/ProgressBar";

const VerifyEmailContent = ({ status }: TProps) => {
  return (
    <div className="py-4 text-sm text-primary-200 leading-relaxed text-left flex flex-col items-start justify-center gap-4 w-full">
      {status === "loading" && (
        <div className="flex items-center gap-3">
          <p>{VERIFY_EMAIL_CLIENT.LOADING_CONTENT}</p>
          <Spinner className="size-6" />
        </div>
      )}
      {status === "success" && (
        <div className="space-y-4 w-full">
          <p>{VERIFY_EMAIL_CLIENT.SUCCESS_CONTENT}</p>
          <ProgressBar duration={3} />
        </div>
      )}
      {status === "error" && <p>{VERIFY_EMAIL_CLIENT.ERROR_CONTENT}</p>}
    </div>
  );
};

export default VerifyEmailContent;

type TProps = {
  status: "loading" | "success" | "error";
};
