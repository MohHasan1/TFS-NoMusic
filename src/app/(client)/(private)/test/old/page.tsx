import { listNomusic } from "#services/nomusic/no-music.ports";
import { OldDialogTestClient } from "./_components/OldDialogTestClient";

export default async function OldDialogTestPage() {
  const res = await listNomusic(3);
  const tracks = res.isSuccess ? res.data : [];

  return <OldDialogTestClient tracks={tracks} />;
}
