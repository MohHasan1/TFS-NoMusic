"use client"
import { logInfo } from "#lib/utils/loggers";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const query = useSearchParams();
  logInfo(query.get("token"));
  return <div>{query.get("token")}</div>;
};

export default ResetPasswordPage;
