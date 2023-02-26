import { Box, Image, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/Index";

import JaxImage from "../../assets/img/Jax.png";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import SvgPlay from "../../assets/svg/SvgPlay";

interface ITrackList {
  onClick?: any;
  name?: string;
  music?: any;
  index?: string | number;
}

export default function ListForAlbumOrTracks({
  music,
  name,
  onClick,
  index,
}: ITrackList) {
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
        <Text mr="30px" color="white">
          0{index}
        </Text>
        <Image src={JaxImage} maxW="42px" mr="23px" />
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
      <Text color="white">3:21</Text>
    </Box>
  );
}
