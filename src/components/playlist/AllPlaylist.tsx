import { Container } from "@chakra-ui/react";
import { useEffect } from "react";

import AudioPlayer from "../audio-player/AudioPlayer";
import ExcerptTrackList from "../excerptTrackList/ExcerptTrackList";
import { useAppSelector } from "../../hooks/Index";
import { useTracksAction } from "../../hooks/useActions";

export default function AllPlaylist() {
  const { fetchTracks } = useTracksAction();
  const { tracks } = useAppSelector((state) => state.musicReducer);

  useEffect(() => {
    fetchTracks();
  }, []);

  console.log(tracks);
  return (
    <section style={{ minHeight: "70vh" }}>
      <AudioPlayer listTruck={tracks} />
      <ExcerptTrackList tracks={tracks} allTracks />
    </section>
  );
}
