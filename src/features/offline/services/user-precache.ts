import { CacheKey } from "#offline/lib/cacheStorage/keys";
import { MediaRepo } from "#offline/repositories/media";
import { OfflineUser } from "#offline/repositories/user";
import type { TUserOffline } from "#offline/types";
import { successResponse } from "#responses";
import type { TUser } from "#types/user";

export const UserPrecacheService = {
  sync,
  clear,
};

async function sync(user: TUser) {
  // -- Get the current user(s):
  const usersResponse = await OfflineUser.getAll();
  if (!usersResponse.isSuccess) return usersResponse;

  const uploadedImageCacheKey = CacheKey.user.cover(user.id);

  // -- Remove previous user(s)
  const previousUsers = usersResponse.data.filter((record) => record.id !== user.id);
  for (const record of previousUsers) {
    const imageDeleteResponse = await MediaRepo.del(CacheKey.user.cover(record.id));
    if (!imageDeleteResponse.isSuccess) return imageDeleteResponse;

    const userDeleteResponse = await OfflineUser.remove(record.id);
    if (!userDeleteResponse.isSuccess) return userDeleteResponse;
  }

  let cachedUploadedImageURL: string | null = null;
  if (user.uploadedImageURL) {
    const imageResponse = await MediaRepo.cache(uploadedImageCacheKey, user.uploadedImageURL);
    if (!imageResponse.isSuccess) return imageResponse;

    cachedUploadedImageURL = uploadedImageCacheKey;
  } else {
    const imageDeleteResponse = await MediaRepo.del(uploadedImageCacheKey);
    if (!imageDeleteResponse.isSuccess) return imageDeleteResponse;
  }

  // -- Save the updated user
  const offlineUser: TUserOffline = {
    ...user,
    uploadedImageURL: cachedUploadedImageURL,
    downloadedAt: Date.now(),
  };

  const saveResponse = await OfflineUser.save(offlineUser);
  if (!saveResponse.isSuccess) return saveResponse;

  return successResponse(offlineUser);
}

async function clear() {
  const usersResponse = await OfflineUser.getAll();
  if (!usersResponse.isSuccess) return usersResponse;

  for (const user of usersResponse.data) {
    const imageDeleteResponse = await MediaRepo.del(CacheKey.user.cover(user.id));
    if (!imageDeleteResponse.isSuccess) return imageDeleteResponse;
  }

  return OfflineUser.clear();
}
