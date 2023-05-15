import React, { useEffect } from "react";
import Disk from "./Disk";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Scrollbar, Mousewheel } from "swiper";
import {
  Box,
  Text,
  useBreakpointValue,
  useDisclosure,
  Skeleton,
  Stack,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/pagination";

import { useAppDispatch, useAppSelector } from "../../../hooks/Index";
import { useModalforms, useTracksAction } from "../../../hooks/useActions";
import ModalUserAuth from "../../../components/form/modal/ModalUser";
import Footer from "../../../components/footer/Footer";
import "./musicStyle.css";

import { ITrack } from "../../../redux/types";
import MusicLeft from "./MusicLeft";
import MusicRight from "./MusicRight";

interface ICartArray {
  cart: string;
  music?: number | null;
  album?: number | null;
}

interface ICart {
  total_price: string | number;
  user: string;
  cart_item: ICartArray[];
}

interface IDataMainPage {
  id?: number;
  music?: ITrack;
  album: boolean;
  albumInfo?: string;
}

const Music = () => {
  const dispatch = useAppDispatch();
  const { fetchTracks } = useTracksAction();
  const { loginModal } = useModalforms();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { modal } = useAppSelector((state) => state.reducerMusicModal);

  const { tracks, albums } = useAppSelector((state) => state.musicReducer);
  const dataMainPage: IDataMainPage[] = [];

  const breakpoints = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  useEffect(() => {
    fetchTracks();
  }, []);

  const filterAlbum = albums.filter((el) => el.music.length);

  tracks.map((el) => dataMainPage.push({ music: el, album: false }));

  filterAlbum?.map((el) =>
    dataMainPage.push({
      id: Number(el.id),
      music: el.music[0],
      album: true,
      albumInfo: el.name,
    })
  );

  return (
    <Box
      width="100%"
      className="music"
      bg="red"
      mx={"auto"}
      style={{ display: modal ? "block" : "none", background: "#1D1D20" }}
      zIndex="auto"
    >
      <ModalUserAuth isOpen={isOpen} onClose={onClose} />
      <Disk />
      {dataMainPage.length ? (
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          speed={1300}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, FreeMode, Scrollbar, Mousewheel]}
          className="mySwiper"
        >
          {dataMainPage &&
            dataMainPage.map((el: IDataMainPage, index) => (
              <Box key={index + 1}>
                {el.music !== null && (
                  <SwiperSlide key={index}>
                    <Box
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                      flexDir={{
                        base: "column",
                        md: "column",
                        lg: "row",
                        xl: "row",
                      }}
                      ml={breakpoints === "base" ? "0" : "0"}
                    >
                      <MusicLeft
                        name={el?.music?.name}
                        image={el?.music?.image}
                      />
                      <MusicRight
                        el={el}
                        index={index}
                        nameAlbum={el?.albumInfo}
                      />
                    </Box>
                    {index === dataMainPage.length - 1 ? (
                      <Box
                        display={{
                          base: "none",
                          sm: "none",
                          md: "none",
                          lg: "block",
                        }}
                        mt="-70px"
                      >
                        <Footer />
                      </Box>
                    ) : (
                      ""
                    )}
                  </SwiperSlide>
                )}
              </Box>
            ))}
        </Swiper>
      ) : (
        <Box
          minH="100vh"
          flexDir={{ base: "column", lg: "row" }}
          display="flex"
          justifyContent={{ base: "center", lg: "center" }}
        >
          <Stack
            w={{ base: "100%", lg: "50%" }}
            px={{ base: "20px", lg: "0px" }}
            mb={{ base: "40px", lg: "0px" }}
          >
            <Skeleton w="100%" h={{ base: "285px", lg: "100%" }}>
              <Box w="100%" h="100%">
                Skeleton
              </Box>
            </Skeleton>
          </Stack>
          <Stack
            w={{ base: "100%", lg: "50%" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={{ base: "20px", lg: "0px" }}
          >
            <Box>
              <Box maxW={{ base: "319px", lg: "378px" }} mx="auto" h="100%">
                <SkeletonText mb="30px">
                  <Text
                    as="h1"
                    fontFamily="sans"
                    fontSize={{
                      base: "25px",
                      sm: "32px",
                      md: "32px",
                      lg: "32px",
                      xl: "35px",
                      "2xl": "38px",
                    }}
                    fontWeight="900"
                    color="white"
                  >
                    SEBELEP - Jax 02.14 [Album]
                  </Text>
                </SkeletonText>
                <Box display="flex" alignItems="center" mb="30px">
                  <SkeletonCircle>
                    <Box w="47px" h="47px" rounded="50%" />
                  </SkeletonCircle>
                  <Skeleton w="100%" h="5px" ml="9px">
                    <Box w="100%" h="2px" bg="white" />
                  </Skeleton>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Skeleton w="175px" h="35px">
                    <Box />
                  </Skeleton>
                  <Skeleton w="175px" h="35px">
                    <Box />
                  </Skeleton>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Music;
