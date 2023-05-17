import {
  Box,
  Button,
  Container,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { tabBooleanAction } from "./action-creators/action";
import SvgMyPlaylistEmpty from "../../assets/svg/SvgMyPlaylistEmpty";
import MyAlbum from "../../containers/MyAlbum/MyAlbum";
import MyTracks from "../../containers/myTracks/Mytracks";
import { useTracksAction } from "../../hooks/useActions";

enum AlbumOrTracks {
  ALBUM = "ALBUM",
  TRACKS = "TRACKS",
}

export default function MyPlaylist() {
  const dispatch = useAppDispatch();
  const { fetchMyAlbums, fetchMyTracks } = useTracksAction();

  const { myTracks } = useAppSelector((state) => state.musicReducer);
  const [isActive, setActive] = useState(AlbumOrTracks.TRACKS);

  const isAlbum = isActive === AlbumOrTracks.ALBUM;
  const isTracks = isActive === AlbumOrTracks.TRACKS;

  useEffect(() => {
    fetchMyAlbums();
    fetchMyTracks();
  }, []);

  return (
    <section>
      <Container maxW="1220px" pt="140px">
        <Box pl={{ base: "0", md: "6%", lg: "3%", xl: "1%" }}>
          <Box
            display="flex"
            justifyContent={{ base: "center", md: "start" }}
            zIndex="0"
            pl="30px"
            fontFamily="Roboto, sans-serif"
          >
            <Text
              cursor="pointer"
              fontWeight="600"
              color={isTracks ? "white" : "rgba(255, 255, 255, 0.4)"}
              mr={{ base: "45px", md: "60px", lg: "70px" }}
              fontSize={{ base: "18px", md: "20px", lg: "24px" }}
              onClick={() => {
                setActive(AlbumOrTracks.TRACKS);
                dispatch(tabBooleanAction(true));
              }}
            >
              Моя музыка
            </Text>
            <Text
              cursor="pointer"
              fontWeight="600"
              color={isAlbum ? "white" : "rgba(255, 255, 255, 0.4)"}
              fontSize={{ base: "18px", md: "20px", lg: "24px" }}
              onClick={() => {
                setActive(AlbumOrTracks.ALBUM);
                dispatch(tabBooleanAction(false));
              }}
            >
              Альбомы
            </Text>
          </Box>
          {!myTracks.length && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              color="white"
              mt="100px"
            >
              <Text
                fontFamily="sans"
                fontWeight="400"
                fontStyle="normal"
                fontSize="16px"
                color="white"
              >
                В вашем кабинете пока нет {isTracks ? "музыки" : "альбомов"}
              </Text>
              <Box my="10">
                <SvgMyPlaylistEmpty />
              </Box>
              <Stack direction="row" spacing={4} align="center">
                <Link to="/excerpts">
                  <Button
                    width="267px"
                    height="45px"
                    colorScheme="blue"
                    bg="#007AFF"
                    variant="solid"
                  >
                    Перейти к покупке
                  </Button>
                </Link>
              </Stack>
            </Box>
          )}
          {myTracks.length && (
            <Box display="flex">
              <Box w="100%" h="auto">
                {isTracks ? <MyTracks /> : <MyAlbum />}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </section>
  );
}
