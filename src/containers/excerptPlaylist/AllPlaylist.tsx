import { useEffect, useState } from "react";

import ExcerptTrackList from "../excerptTrackList/ExcerptTrackList";
import { useAppSelector } from "../../hooks/Index";
import { useTracksAction } from "../../hooks/useActions";
import { readFileAsBase64 } from "../../components/helpers/readFileAsBase64";
// import { ByteToMp } from "../helpers/bytyToMp";
import { ByteToMp3 } from "../../components/helpers/butyToMp3";

export default function AllPlaylist() {
  const { fetchTracks } = useTracksAction();
  const { tracks } = useAppSelector((state) => state.musicReducer);
  const [fileMusic, setFileMusic] = useState<string>();

  useEffect(() => {
    fetchTracks();
  }, []);

  const fileUrl = tracks[0]?.music;
  fileUrl && readFileAsBase64(fileUrl).then((data) => setFileMusic(data));

  const binaryString: any = fileMusic && atob(fileMusic);
  const byteNumbers = new Uint8Array(binaryString?.length);

  for (let i = 0; i < binaryString?.length; i++) {
    byteNumbers[i] = binaryString.charCodeAt(i);
  }

  return (
    <section>
      <ExcerptTrackList tracks={tracks} allTracks />
    </section>
  );
}
