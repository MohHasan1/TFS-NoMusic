import { sqliteAdapter } from "@payloadcms/db-sqlite";

export function makeSqliteDb(url: string) {
  return sqliteAdapter({
    client: { url },
  });
}
