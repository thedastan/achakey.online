import React, { useEffect } from "react";
import Disk from "./Disk";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Scrollbar, Mousewheel } from "swiper";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Input,
  Stack,
  Container,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPlayCircle } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";

import { useAppDispatch, useAppSelector } from "../../../hooks/Index";
import {
  useAction,
  useActionBasket,
  useExcerpAction,
  useModalforms,
  useTracksAction,
} from "../../../hooks/useActions";
import { Link } from "react-router-dom";
import ModalUserAuth from "../../form/modal/ModalUser";
import Footer from "../../footer/Footer";
import { getAccessToken, getIdAlums, getUserId } from "../../helper";
import "./musicStyle.css";
import { changeAction } from "../../../global-audio-player-excerpt/action";
import {
  currentIndexAction,
  eventChange,
} from "../../playlist/reducer/action-creator";
import { SvgPlayerGifDefault } from "../../../assets/svg/SvgPlayerGifDefault";
import { SvgPlayerGif } from "../../../assets/svg/SvgPlayerGif";
import SvgPlay from "../../../assets/svg/SvgPlay";
import { ITrack } from "../../../redux/types";

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
  id?:number,
  music?:ITrack
}

const Music: React.FC<MusicProps> = ({ musicPlay }) => {
  const { fetchTracks } = useTracksAction();
  const dispatch = useAppDispatch();
  const { loginModal } = useModalforms();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { pause, active, duration, currentTime } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const { basket } = useAppSelector((state) => state.reducerBasket);

  const { pauseTrack } = useAction();
  const { postBasketItem, fetchBasket } = useActionBasket();

  const {
    excerptActiveAction,
    excerptForAlbumAction,
    excerptPauseAction,
    excerptPlayAction,
    excerptCurrentTimeAction,
  } = useExcerpAction();

  const { tracks, albums } = useAppSelector((state) => state.musicReducer);
  const dataMainPage: IDataMainPage[] = [];

  function onChangeForMusic(data: any, index: number) {
    excerptActiveAction(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    pauseTrack();
    {
      window.location.pathname === "/excerpts/details/" + getIdAlums()
        ? excerptForAlbumAction(true)
        : excerptForAlbumAction(false);
    }
  }

  const play = (music: any, index: number) => {
    if (!pause) {
      excerptPauseAction();
      pauseTrack();
      if (active?.id !== music?.music?.id || !active) {
        onChangeForMusic(music?.music, index);
      } else {
        excerptPauseAction();
        pauseTrack();
      }
    } else {
      excerptPlayAction();
      pauseTrack();
    }
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAction(Number(e.target.value)));

    excerptCurrentTimeAction(Number(e.target.value));
  };

  function startTimer() {
    let seconds: any = currentTime % 60;
    let minutes: any = Math.floor(currentTime / 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  const breakpoints = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  const PostBasketItem = async (element: ITrack | undefined) => {
    const cart: ICart = {
      user: getUserId(),
      total_price: Number(element?.price),
      cart_item: [
        {
          music: element?.id,
          cart: getUserId(),
          album: null,
        },
      ],
    };

    const userFiter = basket.filter((el) => el.user === getUserId());
    const filterBasket = userFiter[0]?.cart_item;
    const includesTracks = filterBasket?.filter(
      (el) => el.music?.id === cart?.cart_item[0].music
    );

    if (
      includesTracks !== undefined &&
      includesTracks[0]?.music?.id === cart?.cart_item[0]?.music
    ) {
      alert("No");
    } else {
      alert("Success");
      postBasketItem(cart);
      fetchBasket();
    }

    fetchBasket();
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const openModal = () => {
    onOpen();
    loginModal();
  };

  const filterAlbum = albums.filter((el) => el.music.length);

  tracks.map((el) => dataMainPage.push(...dataMainPage, { music: el }));
  
  filterAlbum?.map((el) =>
    dataMainPage.push({
      id: Math.floor(Math.random() * 100),
      music: el.music[0],
    })
  );

  return (
    <Box
      maxW="3072px"
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
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination, FreeMode, Scrollbar, Mousewheel]}
        className="mySwiper"
      >
        {dataMainPage.map((el: any, index) => (
          <Box key={index}>
            {el.music !== null && (
              <SwiperSlide>
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
                  <Box zIndex="-1">
                    <Box
                      width={{
                        base: "80vw",
                        sm: "72vw",
                        md: "53vw",
                        lg: "50vw",
                        xl: "50vw",
                        "2xl": "50vw",
                      }}
                      height={{
                        base: "35vh",
                        sm: "40vh",
                        md: "40vh",
                        lg: "100vh",
                        xl: "100vh",
                        "2xl": "100vh",
                      }}
                      className="music-container"
                      zIndex="-1"
                    >
                      <Image
                        src={el?.music?.image}
                        objectFit="cover"
                        width={{
                          base: "",
                          sm: "60vw",
                          md: "60vw",
                          lg: "50vw",
                          xl: "50vw",
                          "2xl": "50vw",
                        }}
                        height={{
                          base: "",
                          sm: "35vh",
                          md: "35vh",
                          lg: "100vh",
                          xl: "100vh",
                          "2xl": "100vh",
                        }}
                        borderRadius={{
                          base: "20px",
                          sm: "20px",
                          md: "20px",
                          lg: "0",
                          xl: "0",
                        }}
                        m={["10px", "15px", "20px", "0", "0"]}
                        mt={{
                          base: "80px",
                          sm: "80px",
                          md: "80px",
                          lg: "0",
                          xl: "0",
                          "2xl": "0",
                        }}
                        ml={{
                          base: "0",
                          sm: "30px",
                          md: "0",
                          lg: "0",
                          xl: "0",
                          "2xl": "0",
                        }}
                        alt="img"
                        className="music--image"
                      />
                      <Text
                        as="h1"
                        fontFamily="sans"
                        className="music--text"
                        fontSize={{
                          base: "17px",
                          sm: "22px",
                          md: "32px",
                          lg: "32px",
                          xl: "35px",
                          "2xl": "38px",
                        }}
                        fontWeight="900"
                        pt={{ base: "", sm: "0", md: "0" }}
                        color="white"
                      >
                        {el?.music?.name}
                      </Text>
                    </Box>
                  </Box>
                  <Container
                    maxW={["75vw", "70vw", "45vw", "38vw", "34vw"]}
                    pr={["0", "0", "0", "0", "60px"]}
                    ml={["6%", "16%", "22%", "7%", "10%"]}
                    className="music-cont-text"
                  >
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
                      className="music-text-two"
                    >
                      {el?.music?.name}
                      {el?.id ? "  [Album]" : " [offical Audio]"}
                    </Text>
                    <Flex
                      alignItems="center"
                      my={breakpoints === "base" && "sm" && "md" ? "5" : "7"}
                    >
                      <Box
                        fontSize="40px"
                        mr="10px"
                        onClick={() => play(el, index)}
                      >
                        {active?.music_short === el?.music?.music_short ? (
                          <Box
                            display="inline-block"
                            w="32px"
                            h="32px"
                            pt="2px"
                          >
                            {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
                          </Box>
                        ) : (
                          <Box display="inline-block" w="32px">
                            <SvgPlay
                              fill={
                                active?.music_short === el?.music?.music_short
                                  ? "#49DEFF"
                                  : "#FFFFFF"
                              }
                            />
                          </Box>
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" w="100%">
                        <input
                          type="range"
                          min={0}
                          max={duration}
                          value={currentTime}
                          onChange={changeCurrentTime}
                          className="time"
                        />
                        <Text
                          as="span"
                          ml="11px"
                          fontFamily="sans"
                          fontWeight="semibold"
                          fontSize={["10px", "12px", "14px", "14px", "14px"]}
                          color="rgba(255,255,255,0.34)"
                        >
                          {startTimer()}
                        </Text>
                      </Box>
                    </Flex>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={4} align="center">
                        {!getAccessToken() ? (
                          <Button
                            bg="none"
                            fontFamily="sans"
                            fontSize="14px"
                            width={{
                              base: "",
                              sm: "140px",
                              md: "160px",
                              lg: "160px",
                              xl: "180px",
                              "2xl": "210px",
                            }}
                            py="9px"
                            border="1px"
                            borderColor="white"
                            borderRadius="md"
                            color="white"
                            _hover={{
                              color: "#49DEFF",
                              borderColor: "#49DEFF",
                              background: "none",
                            }}
                            className="music--button"
                            onClick={() =>
                              getAccessToken()
                                ? PostBasketItem(el.music)
                                : openModal()
                            }
                          >
                            В корзину
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              getAccessToken()
                                ? PostBasketItem(el.music)
                                : openModal()
                            }
                            bg="none"
                            fontFamily="sans"
                            fontSize="14px"
                            width={{
                              base: "",
                              sm: "140px",
                              md: "160px",
                              lg: "160px",
                              xl: "180px",
                              "2xl": "210px",
                            }}
                            py="9px"
                            border="1px"
                            borderColor="white"
                            borderRadius="md"
                            color="white"
                            _hover={{
                              color: "#49DEFF",
                              borderColor: "#49DEFF",
                              background: "none",
                            }}
                            className="music--button"
                          >
                            В корзину
                          </Button>
                        )}
                        <Link
                          to={
                            el?.music?.album
                              ? `/excerpts/details/${el?.music?.album}`
                              : "/excerpts"
                          }
                        >
                          <Button
                            border="1px"
                            bg="none"
                            fontFamily="sans"
                            fontSize="14px"
                            width={{
                              base: "",
                              sm: "140px",
                              md: "160px",
                              lg: "160px",
                              xl: "180px",
                              "2xl": "210px",
                            }}
                            py="9px"
                            borderColor="white"
                            borderRadius="md"
                            color="white"
                            mx="20px"
                            className="music--button"
                            _hover={{
                              color: "#49DEFF",
                              borderColor: "#49DEFF",
                              background: "none",
                            }}
                          >
                            {!el?.music?.album ? "все треки" : "Треки альбома"}
                          </Button>
                        </Link>
                      </Stack>
                    </Box>
                  </Container>
                </Box>
                {index === dataMainPage.length - 1 ? (
                  <Box
                    display={{
                      base: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    }}
                    mt="-89px"
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
