import type { Metadata } from "next";
import RequestAccessSection from "@/components/public/request-access/sections/RequestAccessSection";

export const metadata: Metadata = {
  title: "Request Access",
  description: "Request access to the private NoMusic listening experience.",
};

// TODO: add success alert sayign check ur email inbox when access is accpeted to sign up
const RequestAccessPage = () => {
  return <RequestAccessSection />;
};

export default RequestAccessPage;
