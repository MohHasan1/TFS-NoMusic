import { Library } from "#payload-types";
import {
  getLibraryAdapter,
  getLibraryAudioAdapter,
  listLibrariesAdapter,
  TlistLibrariesAdapter,
} from "./libraries-pl.adapter";

export async function listLibraries({ type, limit }: TlistLibrariesAdapter) {
  return listLibrariesAdapter({ type, limit });
}

export async function getLibrary(id: Library["id"]) {
  return getLibraryAdapter(id);
}

export async function getLibraryAudio(id: Library["id"]) {
  return getLibraryAudioAdapter(id);
}
