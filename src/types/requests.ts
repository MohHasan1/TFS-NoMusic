import type { Request } from "#payload-types";

export type TRequest = {
  type: Request["type"];
  name: Request["name"];
  email: Request["email"];
  url: Request["url"];
  message: Request["message"];
  metadata: Request["metadata"];
};  
