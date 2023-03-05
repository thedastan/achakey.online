import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import AudioPlayer from "../../components/audio-player/AudioPlayer";
import ExcerptAlbums from "../../components/excerpt-albums/ExcerptAlbums";
import { useAppSelector } from "../../hooks/Index";
import { useTracksAction } from "../../hooks/useActions";

export default function AllAlbums() {
  const { fetchTracks } = useTracksAction();
  const { tracks } = useAppSelector((state) => state.musicReducer);

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <section style={{ minHeight: "70vh" }}>
      <Container maxW="1220px" pt="140px">
        <AudioPlayer listTruck={tracks} />
        <ExcerptAlbums tracks={tracks} />
      </Container>
    </section>
  );
}
