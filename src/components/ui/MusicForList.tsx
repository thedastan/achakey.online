import { Box, Button, Text, Image } from "@chakra-ui/react";

import SvgPlay from "../../assets/svg/SvgPlay";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { useAppSelector } from "../../hooks/Index";
import trackImage from "../../assets/img/Ellipse.png";
import { ITrack } from "../../redux/types";
import {
  useAction,
  useActionBasket,
  useExcerpAction,
} from "../../hooks/useActions";
import { useEffect, useState } from "react";
import { getIdAlums, getUserId } from "../helper";

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: ITrack;
  tracks?: boolean;
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
  tracks,
}: ITrackChange) {
  const [title, setTitle] = useState("+ в корзину");
  const { basket } = useAppSelector((state) => state.reducerBasket);
  const { postBasketItem, fetchBasket } = useActionBasket();

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

    console.log(includesTracks === undefined);

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
    fetchBasket();
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
          fontSize="14px"
          ml="17.4px"
          cursor="pointer"
        >
          {name}
        </Text>
      </Box>
      <Text color="white" display={{ base: "none", md: "block" }}>
        {music?.music_short_len}
      </Text>
      <Text color="white" ml="50px">
        {music?.price}
      </Text>
      {window.location.pathname !== "/excerpts/details/" + getIdAlums() ? (
        <Button
          onClick={() => PostBasketItem(music)}
          border="1px"
          borderColor={
            active?.music_short === music?.music_short ? "blue" : "white"
          }
          rounded="38px"
          fontSize="9px"
          h="23px"
          w="84px"
          textColor={
            active?.music_short === music?.music_short ? "blue" : "white"
          }
          background="transparent"
          colorScheme="none"
        >
          {title}
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}
