import { VERIFY_EMAIL_CLIENT } from "#constants/auth/verify-email";
import { Spinner } from "@/components/ui/spinner";

const VerifyEmailContent = ({ status }: TProps) => {
  return (
    <div className="py-4 text-sm text-purple-200 leading-relaxed text-center flex flex-col items-center justify-center gap-3">
      {status === "loading" && (
        <>
          <Spinner className="size-6" />
          <p>{VERIFY_EMAIL_CLIENT.LOADING_CONTENT}</p>
        </>
      )}
      {status === "success" && <p>{VERIFY_EMAIL_CLIENT.SUCCESS_CONTENT}</p>}
      {status === "error" && <p>{VERIFY_EMAIL_CLIENT.ERROR_CONTENT}</p>}
    </div>
  );
};

export default VerifyEmailContent;

type TProps = {
  status: "loading" | "success" | "error";
};
