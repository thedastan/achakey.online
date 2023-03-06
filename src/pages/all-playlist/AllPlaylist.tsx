import { Container } from "@chakra-ui/react";
import { useEffect } from "react";

import AudioPlayer from "../../components/audio-player/AudioPlayer";
import ExcerptTrackList from "../../components/excerptTrackList/ExcerptTrackList";
import { useAppSelector } from "../../hooks/Index";
import { useTracksAction } from "../../hooks/useActions";

export default function AllPlaylist() {
  const { fetchTracks } = useTracksAction();
  const { tracks } = useAppSelector((state) => state.musicReducer);

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <section style={{ minHeight: "70vh" }}>
      <Container maxW="1220px" pt="140px">
        <AudioPlayer listTruck={tracks} />
        <ExcerptTrackList tracks={tracks} allTracks />
      </Container>
    </section>
  );
}
