import { Box, Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import AudioPlayer from "../../components/audio-player/AudioPlayer";
import BottomPlayer from "../../components/bottom-audio-player/BottomPLayer";
import ExcerptTrackList from "../../containers/excerptTrackList/ExcerptTrackList";
import Footer from "../../components/footer/Footer";

import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { fetchAlbumsDetails } from "./action-creators";

export default function DetailsAlbums() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { albums } = useAppSelector((state) => state.reducerDetailsAlbums);

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchAlbumsDetails(id));
    localStorage.setItem("id-album", JSON.stringify(id));
  }, []);

  const styles = {
    backgroundImage: `url("${albums.image}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 50vh",
    backgroundColor: "#1D1D20",
  };

  return (
    <section>
      <div style={styles}>
        <Box className="bg-menuBar-blur">
          <Container maxW="1220px" pt="140px">
            <Box pl={{ base: "0", md: "4%", lg: "2%", xl: "1%" }}>
              <AudioPlayer listTruck={albums.music} />
              <ExcerptTrackList tracks={albums.music} />
            </Box>
            <BottomPlayer />
          </Container>
        </Box>
      </div>
      <Footer />
    </section>
  );
}
