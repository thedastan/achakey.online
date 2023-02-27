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
      borderBottom="1px"
      borderColor="#4F4F4F"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      background="transparent"
    >
      <Box display="flex" alignItems="center">
        <Text mr={{ base: "10px", md: "30px" }} color="white">
          0{index}
        </Text>
        <Image src={JaxImage} maxW="42px" mr={{ base: "9px", md: "23px" }} />
        {active?.audio === music.audio ? (
          <Box display="inline-block" w="32px" h="32px" pt="2px">
            {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
          </Box>
        ) : (
          <Box display="inline-block" w="32px">
            <SvgPlay
              fill={active?.audio === music.audio ? "#49DEFF" : "#FFFFFF"}
            />
          </Box>
        )}
        <Text
          textColor={active?.audio === music.audio ? "blue" : "white"}
          fontSize="14px"
          ml={{ base: "8px", md: "17.4px" }}
          cursor="pointer"
        >
          {name}
        </Text>
      </Box>
      <Text
        color="white"
        textColor={active?.audio === music.audio ? "blue" : "white"}
      >
        3:21
      </Text>
    </Box>
  );
}
