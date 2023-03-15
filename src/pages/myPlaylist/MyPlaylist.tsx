import {Box, Button, Container, Image, Stack, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import BottomPlayer from "../../components/bottom-audio-player/BottomPLayer";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { tabBooleanAction } from "./action-creators/action";
import {Link} from "react-router-dom";
import SvgMyPlaylistEmpty from "../../assets/svg/SvgMyPlaylistEmpty";
import MyAlbum from "../../components/MyAlbum/MyAlbum";
import MyTracks from "../../components/my-tracks/Mytracks";

enum AlbumOrTracks {
  ALBUM = "ALBUM",
  TRACKS = "TRACKS",
}

export default function MyPlaylist() {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.reducerBasket);
  const [isActive, setActive] = useState(AlbumOrTracks.TRACKS);
  const isAlbum = isActive === AlbumOrTracks.ALBUM;
  const isTracks = isActive === AlbumOrTracks.TRACKS;

  const arrayLength =  basket.map((el ) =>  el.cart_item.length )


  return (
    <section>
      <Container maxW="1220px" pt="140px">
        <Box pl={{ base: "0", md: "4%", lg: "2%", xl: "1%" }}>
          <Box display="flex" mb="31px" zIndex="0">
            <Text
              cursor="pointer"
              fontWeight="600"
              color={isTracks ? "white" : "rgba(255, 255, 255, 0.4)"}
              mr={{ base: "35px", md: "50px", lg: "69px" }}
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
              Моя альбом
            </Text>
          </Box>
          {!arrayLength[0] && (
              <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  color="white"
                  mt={["-8rem","-13rem","-16rem","-10rem","60px"]}
              >
                <Text
                    fontFamily="sans"
                    fontWeight="400"
                    fontStyle="normal"
                    fontSize="16px"
                    color="white"
                    pt={{base: "40%", lg: "20%", xl: "0"}}>
                  В вашем кабинете пока нет альбомов
                </Text>
                <Box my="10"><SvgMyPlaylistEmpty/></Box>
                <Stack direction='row' spacing={4} align='center'>
                  <Link to="/excerpts">
                    <Button width="267px" height="45px" colorScheme='blue' bg="#007AFF" variant='solid'>
                      Перейти к покупке
                    </Button>
                  </Link>
                </Stack>
              </Box>
          )}
          {/*<Box display="flex">*/}
          {/*   <Box*/}
          {/*        // w={{ base: "90vw", lg: "630px" }} h="auto"*/}
             {/*>*/}
             {/*    {isTracks ? <MyTracks /> : <MyAlbum />}*/}
             {/*</Box>*/}
             {/*   </Box>*/}
              </Box>
      </Container>
    </section>
  );
}
