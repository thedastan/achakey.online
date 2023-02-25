import { Box, Button, Text, Image } from "@chakra-ui/react";
import SvgPlay from "../../assets/svg/SvgPlay";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { useAppSelector } from "../../hooks/Index";
import trackImage from "../../assets/img/Ellipse.png";

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: any;
  tracks?: boolean;
}

export default function MuITrackListsicForList({
  onClick,
  name,
  music,
  tracks,
}: ITrackChange) {
  const { active, pause } = useAppSelector((state) => state.playReducer);

  return (
    <Box
      py="22px"
      onClick={() => onClick(music)}
      borderBottom="2px"
      borderColor="#4F4F4F"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      background="transparent"
    >
      <Box display="flex" alignItems="center" w="25vw">
        {tracks && <Image src={trackImage} w="47px" mr="29px" />}
        {active?._id === music._id ? (
          <Box display="inline-block" w="32px" h="32px" pt="2px">
            {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
          </Box>
        ) : (
          <Box display="inline-block" w="32px">
            <SvgPlay fill={active?._id === music._id ? "#0EEB24" : "#FFFFFF"} />
          </Box>
        )}
        <Text
          textColor={active?._id === music._id ? "green" : "white"}
          fontSize="14px"
          ml="17.4px"
          cursor="pointer"
        >
          {name}
        </Text>
      </Box>
      <Text color="white">{music.excerpt}</Text>
      <Text color="white" ml="50px">
        {music.price}
      </Text>
      <Button
        border="1px"
        borderColor={active?._id === music._id ? "green" : "white"}
        rounded="38px"
        fontSize="9px"
        h="23px"
        w="84px"
        textColor={active?._id === music._id ? "green" : "white"}
        background="transparent"
        colorScheme="none"
      >
        + в корзину
      </Button>
    </Box>
  );
}
