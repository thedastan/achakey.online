import { Box, Button, Text, Image } from "@chakra-ui/react";
import SvgPlay from "../../assets/svg/SvgPlay";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { useAppSelector } from "../../hooks/Index";
import trackImage from "../../assets/img/Ellipse.png";
import { ITrack } from "../../redux/types";
import { useActionBasket, useActionUser } from "../../hooks/useActions";
import { useEffect } from "react";
import { getUserId } from "../helper";
import API from "../../api/Index";

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: ITrack;
  tracks?: boolean;
}

export default function MuITrackListsicForList({
  onClick,
  name,
  music,
  tracks,
}: ITrackChange) {
  const { active, pause } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );
  const { user } = useAppSelector((state) => state.reducerUser);

  const { postBasketItem } = useActionBasket();
  const { fetchUser } = useActionUser();

  const PostBasketItem = async (element: any) => {
    try {
      const response = await API.post("account/cart_item/", {
        cart: getUserId(),
        music: element,
      });

      alert(JSON.parse(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
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
      _hover={
        {
          // background: "rgba(255, 255, 255, 0.08)",
          // rounded: "8px",
          // borderColor: "transparent",
        }
      }
    >
      <Box
        display="flex"
        alignItems="center"
        w="25vw"
        onClick={() => onClick(music)}
      >
        {tracks && <Image src={trackImage} w="47px" mr="29px" />}
        {active?.music === music?.music ? (
          <Box display="inline-block" w="32px" h="32px" pt="2px">
            {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
          </Box>
        ) : (
          <Box display="inline-block" w="32px">
            <SvgPlay
              fill={active?.music === music?.music ? "#49DEFF" : "#FFFFFF"}
            />
          </Box>
        )}
        <Text
          textColor={active?.music === music?.music ? "blue" : "white"}
          fontSize="14px"
          ml="17.4px"
          cursor="pointer"
        >
          {name}
        </Text>
      </Box>
      <Text color="white" display={{ base: "none", md: "block" }}>
        {music?.music_len}
      </Text>
      <Text color="white" ml="50px">
        {music?.price}
      </Text>
      <Button
        onClick={() => PostBasketItem(music)}
        border="1px"
        borderColor={active?.music === music?.music ? "blue" : "white"}
        rounded="38px"
        fontSize="9px"
        h="23px"
        w="84px"
        textColor={active?.music === music?.music ? "blue" : "white"}
        background="transparent"
        colorScheme="none"
      >
        + в корзину
      </Button>
    </Box>
  );
}
