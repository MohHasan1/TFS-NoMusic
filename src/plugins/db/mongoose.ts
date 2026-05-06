import { mongooseAdapter } from "@payloadcms/db-mongodb";

export function makeMongooseDb(url: string) {
  return mongooseAdapter({ url });
}
