import { listNomusicAdapter } from "@/services/no-music/no-music-pl.adapter";

export async function listNomusic() {
  return listNomusicAdapter();
}
