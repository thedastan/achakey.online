import React, { useEffect } from "react";
import Disk from "./Disk";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Scrollbar, Mousewheel } from "swiper";
import { Box, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
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

interface MusicProps {
  musicPlay: boolean;
}

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

const Music: React.FC<MusicProps> = ({ musicPlay }) => {
  const dispatch = useAppDispatch();
  const { fetchTracks } = useTracksAction();
  const { loginModal } = useModalforms();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      style={{ display: musicPlay ? "block" : "none", background: "#1D1D20" }}
      zIndex="auto"
    >
      <ModalUserAuth isOpen={isOpen} onClose={onClose} />
      <Disk musicPlay={musicPlay} />
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
        {dataMainPage.map((el: IDataMainPage, index) => (
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
                  <MusicLeft name={el?.music?.name} image={el?.music?.image} />
                  <MusicRight el={el} index={index} nameAlbum={el?.albumInfo} />
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
    </Box>
  );
};

export default Music;
