import { Box, Button, Text, Image } from "@chakra-ui/react";
import SvgPlay from "../../assets/svg/SvgPlay";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { useAppSelector } from "../../hooks/Index";
import trackImage from "../../assets/img/Ellipse.png";
import { ITrack } from "../../redux/types";
import { useActionBasket, useActionUser } from "../../hooks/useActions";
import { useEffect, useState } from "react";
import { getUserId } from "../helper";

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: ITrack;
  tracks?: boolean;
}

interface ICartArray {
  cart: string;
  music: number;
  album: number;
}
interface ICart {
  total_price: string | number;
  user: string;
  cart_item: ICartArray[];
}

export default function MuITrackListsicForList({
  onClick,
  name,
  music,
  tracks,
}: ITrackChange) {
  const [title, setTitle] = useState("+ в корзину");
  const { active, pause } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );
  const { basket } = useAppSelector((state) => state.reducerBasket);

  const { postBasketItem, fetchBasket } = useActionBasket();

  const PostBasketItem = async (element: any) => {
    const cart: ICart = {
      user: getUserId(),
      total_price: element.price,
      cart_item: [
        {
          music: element?.id,
          cart: getUserId(),
          album: 1,
        },
      ],
    };

    basket.forEach((obj1) => music?.id !== obj1.id && postBasketItem(cart));
  };

  function filterTraks() {
    basket.forEach((obj1) =>
      music?.id === obj1.id ? setTitle("в корзине") : setTitle("+ в корзину")
    );
  }

  useEffect(() => {
    fetchBasket();
  }, []);

  useEffect(() => {
    filterTraks();
  }, [music, title, basket]);

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
        onClick={() => onClick(music)}
      >
        {tracks && <Image src={trackImage} w="47px" mr="29px" />}
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
    </Box>
  );
}
