import { createOfflineRepo } from "#offline/lib/indexedDb/factory";

export const OfflineUser = createOfflineRepo("users");
