import { listNomusic } from "#services/nomusic/no-music.ports";
import { NewDialogTestClient } from "./_components/NewDialogTestClient";

export default async function NewDialogTestPage() {
  const res = await listNomusic(3);
  const tracks = res.isSuccess ? res.data : [];

  return <NewDialogTestClient tracks={tracks} />;
}
