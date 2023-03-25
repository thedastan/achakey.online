import { Box, Button, Text, Image, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

import SvgPlay from "../../assets/svg/SvgPlay";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { useAppSelector } from "../../hooks/Index";
import { ITrack } from "../../redux/types";
import {
  useAction,
  useActionBasket,
  useExcerpAction,
  useModalforms,
  useTracksAction,
} from "../../hooks/useActions";
import { getAccessToken, getUserId } from "../helper";
import ModalUserAuth from "../form/modal/ModalUser";
import SvgCheckMark from "../../assets/svg/SvgCheckMark";

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: ITrack;
  trackBoolean?: boolean;
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

export default function MusicForList({
  onClick,
  name,
  music,
  trackBoolean,
}: ITrackChange) {
  const { fetchMyTracks } = useTracksAction();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginModal } = useModalforms();

  const { basket } = useAppSelector((state) => state.reducerBasket);
  const { myTracks } = useAppSelector((state) => state.musicReducer);
  const { postBasketItem, fetchBasket } = useActionBasket();
  const userFilter = basket.filter((el) => el.user === getUserId());

  const { pause, active } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const { pauseTrack } = useAction();

  const { excerptPauseAction, excerptPlayAction } = useExcerpAction();

  const play = (music: any) => {
    if (pause) {
      excerptPlayAction();
      pauseTrack();
    } else {
      excerptPauseAction();
      onClick(music);
      pauseTrack();
    }
  };

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
      console.log("no");
    } else {
      postBasketItem(cart);
      fetchBasket();
    }

    fetchBasket();
  };

  const openModal = () => {
    onOpen();
    loginModal();
  };

  function currentTimerAudio() {
    let minutes: any = Math.floor(Number(music?.music_short_len) / 60);
    let seconds: any = Number(music?.music_short_len) % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  const cart_item = userFilter[0]?.cart_item;

  const findMusic = cart_item?.some((el) => el.music?.id === music?.id);
  const findMyMusic = myTracks.some((el) => el.id === music?.id);

  useEffect(() => {
    fetchMyTracks();
  }, []);

  return (
    <Box
      py="22px"
      borderBottom="2px"
      borderColor="#4F4F4F"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      background="transparent"
    >
      <ModalUserAuth isOpen={isOpen} onClose={onClose} />
      <Box
        display="flex"
        alignItems="center"
        w="25vw"
        onClick={() => {
          play(music);
        }}
      >
        <Image
          src={music?.image}
          rounded="50%"
          w="47px"
          h="47px"
          mr="29px"
          display={{ base: "none", md: "block" }}
        />
        {active?.music_short === music?.music_short ? (
          <Box display="inline-block" w="32px" h="32px" pt="2px">
            {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
          </Box>
        ) : (
          <Box display="inline-block" w="32px">
            <SvgPlay
              fill={
                active?.music_short === music?.music_short
                  ? "#49DEFF"
                  : "#FFFFFF"
              }
            />
          </Box>
        )}
        <Text
          textColor={
            active?.music_short === music?.music_short ? "blue" : "white"
          }
          fontSize="14.53px"
          ml="17.4px"
          cursor="pointer"
          noOfLines={1}
        >
          {name}
        </Text>
      </Box>
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        ml={{ base: "0", sm: "22px" }}
      >
        <Text
          display="flex"
          alignItems="center"
          color={active?.music_short === music?.music_short ? "blue" : "white"}
          fontSize="14.53px"
        >
          {currentTimerAudio()}
        </Text>
      </Box>

      <Text
        color={active?.music_short === music?.music_short ? "blue" : "white"}
        ml={{ base: "5px", md: "50px" }}
        display="flex"
        alignItems={"center"}
        fontSize="14.53px"
      >
        {Math.floor(Number(music?.price))} сом
      </Text>
      <Box display="flex" alignItems="center">
        <Button
          onClick={() =>
            getAccessToken()
              ? findMyMusic
                ? console.log('Уже куплен')
                : PostBasketItem(music)
              : openModal()
          }
          border="1px"
          borderColor={
            active?.music_short === music?.music_short ? "blue" : "white"
          }
          rounded="38px"
          fontSize="9px"
          h="23px"
          w="84px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          textColor={
            active?.music_short === music?.music_short ? "blue" : "white"
          }
          background="transparent"
          colorScheme="none"
          color={findMyMusic ? "#49DEFF" : "white"}
        >
          {findMyMusic ? `куплен` : findMusic ? "в корзине" : "+ в корзину"}
          {findMyMusic && (
            <Box mt="-3px">
              <SvgCheckMark />
            </Box>
          )}
        </Button>
      </Box>
    </Box>
  );
}
