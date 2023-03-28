import { Box, Container, Text } from "@chakra-ui/react";
import { useState } from "react";

import { AllPlaylist } from "../Index";
import AllAlbums from "../../components/albums/AllAlbums";

enum AlbumOrTracks {
  ALBUM = "ALBUM",
  TRACKS = "TRACKS",
}

interface ITab {
  setActive: (value: any) => void;
  isAlbum: boolean;
  isTracks: boolean;
}

export default function ExcerptPlayList({
  isAlbum,
  isTracks,
  setActive,
}: ITab) {
  return (
    <section className="bg-menuBar">
      <Box className="bg-menuBar-blur">
        <Container maxW="1220px" pt="140px">
          <Box pl={{ base: "0", md: "6%", lg: "3%", xl: "1%" }}>
            <Box
              display="flex"
              mb="31px"
              zIndex="0"
              justifyContent={{ base: "center", md: "start" }}
            >
              <Text
                cursor="pointer"
                fontWeight="600"
                color={isTracks ? "white" : "rgba(255, 255, 255, 0.4)"}
                mr={{ base: "35px", md: "50px", lg: "69px" }}
                fontSize={{ base: "18px", md: "20px", lg: "24px" }}
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
                fontSize={{ base: "18px", md: "20px", lg: "24px" }}
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
        </Container>
      </Box>
    </section>
  );
}
