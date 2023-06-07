import { Box, Image, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/Index";

import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import SvgPlay from "../../assets/svg/SvgPlay";
import { IMyTrack, ITrack } from "../../redux/types";
import defaultImage from "../../assets/img/defaultImage.png";
import { useAction, useExcerpAction } from "../../hooks/useActions";

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
  const { playTrack, pauseTrack } = useAction();
  const { excerptPauseAction } = useExcerpAction();

  const { active, pause } = useAppSelector((state) => state.playReducer);

  function currentTimerAudio() {
    let minutes: any = Math.floor(Number(music.music_len) / 60);
    let seconds: any = Number(music.music_len) % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  const play = (music?: ITrack) => {
    pauseTrack();
    if (pause) {
      playTrack();
      if (music?.music !== active?.music) {
        excerptPauseAction();
        pauseTrack();
        onClick(music);
      }
    } else {
      excerptPauseAction();
      onClick(music);
    }
  };

  return (
    <Box
      px="29px"
      onClick={() => play(music)}
      background={
        active?.music === music?.music
          ? "rgba(255, 255, 255, 0.08)"
          : "transparent"
      }
      rounded="8px"
    >
      <Box
        py="8px"
        borderBottom={
          active?.music === music?.music ? "0" : "1px solid #4F4F4F"
        }
        display="flex"
        justifyContent="space-between"
        alignContent="center"
      >
        <Box display="flex" alignItems="center">
          <Text
            mr={{ base: "10px", md: "30px" }}
            color="white"
            fontFamily="montsserat"
          >
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
              <Box display="flex" justifyContent="center">
                {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
              </Box>
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
            noOfLines={1}
            fontFamily="montsserat"
          >
            {`${name} - Jax 02.14  [offical Audio]`}
          </Text>
        </Box>
        <Text
          fontFamily="montsserat"
          color="white"
          textColor={active?.music === music?.music ? "blue" : "white"}
          pt="9px"
        >
          {currentTimerAudio()}
        </Text>
      </Box>
    </Box>
  );
}
