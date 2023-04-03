import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { SvgPlayerGifDefault } from "../../../../assets/svg/SvgPlayerGifDefault";
import { SvgPlayerGif } from "../../../../assets/svg/SvgPlayerGif";
import SvgPlay from "../../../../assets/svg/SvgPlay";
import { getAccessToken, getIdAlums, getUserId } from "../../../helper";
import { Link } from "react-router-dom";
import {
  useAction,
  useActionBasket,
  useExcerpAction,
  useModalforms,
  useTracksAction,
} from "../../../../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../../../../hooks/Index";
import {
  currentIndexAction,
  eventChange,
} from "../../../playlist/reducer/action-creator";
import { changeAction } from "../../../../global-audio-player-excerpt/action";
import { ITrack } from "../../../../redux/types";
import ModalUserAuth from "../../../form/modal/ModalUser";

interface IMusicRight {
  el: any;
  index: number;
  nameAlbum?: string;
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
}

const MusicRight = ({ el, nameAlbum, index }: IMusicRight) => {
  const dispatch = useAppDispatch();
  const { fetchTracks } = useTracksAction();
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

    const userFilter = basket.filter((el) => el.user === getUserId());
    const filterBasket = userFilter[0]?.cart_item;
    const includesTracks = filterBasket?.filter(
      (el) => el.music?.id === cart?.cart_item[0].music
    );

    if (
      includesTracks !== undefined &&
      includesTracks[0]?.music?.id === cart?.cart_item[0]?.music
    ) {
      console.log("no");
    } else {
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

  const userFilter = basket.filter((el) => el.user === getUserId());

  const findBasketMusic = userFilter[0]?.cart_item.some((item) =>
    !el.id ? item.music?.id === el?.music?.id : item.album?.id === el?.id
  );

  return (
    <>
      <Container
        maxW={["82vw", "62vw", "54vw", "36vw", "34vw"]}
        pr={["0", "0", "0", "0", "60px"]}
        ml={["6%", "16%", "22%", "7%", "10%"]}
        className="music-cont-text"
      >
        <ModalUserAuth isOpen={isOpen} onClose={onClose} />
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
          {nameAlbum ? nameAlbum : el?.music?.name}
          {el?.id ? "  [Album]" : " [offical Audio]"}
        </Text>
        <Flex
          alignItems="center"
          my={breakpoints === "base" && "sm" && "md" ? "5" : "7"}
        >
          <Box fontSize="40px" mr="10px" onClick={() => play(el, index)}>
            {active?.music_short === el?.music?.music_short ? (
              <Box display="inline-block" w="32px" h="32px" pt="2px">
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
              value={
                el?.music?.music_short === active?.music_short ? currentTime : 0
              }
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
              {el?.music?.music_short === active?.music_short
                ? startTimer()
                : "00:00"}
            </Text>
          </Box>
        </Flex>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            onClick={() =>
              getAccessToken()
                ? !findBasketMusic && PostBasketItem(el.music)
                : openModal()
            }
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
            bg={findBasketMusic ? "#007AFF" : "none"}
            border={findBasketMusic ? "none" :"1px"}
            borderColor={findBasketMusic ? "#49DEFF" : "none"}
            color={findBasketMusic ? "white" :"#49DEFF"}
            borderRadius="5px"
            _hover={{
              color: "white",
              bg: "#007AFF",
              border: "none",
            }}
            className="music--button"
          >
            {findBasketMusic ? "В корзине" : "В корзину"}
            {!el?.music?.album ? (
              <Box
                display="flex"
                px="5px"
                color="white"
                fontFamily="sans"
                fontSize="14px"
              >
                {Math.floor(el.music.price)}
                <Box px="3px" textDecoration="underline">
                  c
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Button>
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
              height="35px"
              borderColor="white"
              borderRadius="5px"
              color="white"
              className="music--button"
              _hover={{
                color: "#49DEFF",
                borderColor: "#49DEFF",
                background: "none",
              }}
            >
              {!el?.music?.album ? "Все треки" : "Треки альбома"}
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default MusicRight;
