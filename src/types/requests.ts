import type { Request } from "#payload-types";

export type TRequest = {
  url: Request["url"];
  type: Request["type"];
  name: Request["name"];
  email: Request["email"];
  message?: Request["message"];
  metadata?: Request["metadata"];
};
