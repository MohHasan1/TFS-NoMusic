import { Library } from "#payload-types";
import {
  getLibraryAdapter,
  getLibraryAudioAdapter,
  listLibrariesAdapter,
} from "./libraries-pl.adapter";

export async function listLibraries(type?: Library["type"]) {
  return listLibrariesAdapter(type);
}

export async function getLibrary(id: Library["id"]) {
  return getLibraryAdapter(id);
}

export async function getLibraryAudio(id: Library["id"]) {
  return getLibraryAudioAdapter(id);
}
