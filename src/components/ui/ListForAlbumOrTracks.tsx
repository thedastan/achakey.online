import { Box, Image, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/Index";

import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import SvgPlay from "../../assets/svg/SvgPlay";
import { IMyTrack } from "../../redux/types";
import defaultImage from "../../assets/img/defaultImage.png";

interface ITrackList {
  onClick?: any;
  name?: string;
  music: IMyTrack;
  index?: string | number;
}

export default function ListForAlbumOrTracks({
  music,
  name,
  onClick,
  index,
}: ITrackList) {
  const { active, pause } = useAppSelector((state) => state.playReducer);

  function currentTimerAudio() {
    let minutes: any = Math.floor(Number(music.music_len) / 60);
    let seconds: any = Number(music.music_len) % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

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
        <Image
          src={music?.image ? music.image : defaultImage}
          w="42px"
          h="42px"
          mr={{ base: "9px", md: "23px" }}
          rounded="4px"
          objectFit="cover"
        />
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
          ml={{ base: "8px", md: "17.4px" }}
          cursor="pointer"
        >
          {name}
          {" [offical Audio]"}
        </Text>
      </Box>
      <Text
        color="white"
        textColor={active?.music === music?.music ? "blue" : "white"}
      >
        {currentTimerAudio()}
      </Text>
    </Box>
  );
}
