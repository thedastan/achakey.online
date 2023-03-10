import { Box, Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import BottomPlayer from "../../components/bottom-audio-player/BottomPLayer";
import { AllPlaylist } from "../Index";
import AllAlbums from "../../components/albums/AllAlbums";

enum AlbumOrTracks {
  ALBUM = "ALBUM",
  TRACKS = "TRACKS",
}

export default function ExcerptPlayList() {
  const [isActive, setActive] = useState(AlbumOrTracks.TRACKS);

  const isAlbum = isActive === AlbumOrTracks.ALBUM;
  const isTracks = isActive === AlbumOrTracks.TRACKS;

  return (
    <section>
      <Container maxW="1220px" pt="140px">
        <Box pl={{ base: "0", md: "4%", lg: "2%", xl: "1%" }}>
          <Box display="flex" mb="31px" zIndex="0">
            <Text
              cursor="pointer"
              fontWeight="600"
              color={isTracks ? "white" : "rgba(255, 255, 255, 0.4)"}
              mr="69px"
              fontSize="24px"
              onClick={() => {
                setActive(AlbumOrTracks.TRACKS);
              }}
            >
              Все треки
            </Text>
            <Text
              cursor="pointer"
              fontWeight="600"
              color={isAlbum ? "white" : "rgba(255, 255, 255, 0.4)"}
              fontSize="24px"
              onClick={() => {
                setActive(AlbumOrTracks.ALBUM);
              }}
            >
              Альбомы
            </Text>
          </Box>
          <Box display="flex">
            <Box w="100vw" h="auto">
              {isTracks ? <AllPlaylist /> : <AllAlbums />}
            </Box>
          </Box>
        </Box>
        <BottomPlayer />
      </Container>
    </section>
  );
}
