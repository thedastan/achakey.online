import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SvgNext from "../../assets/svg/SvgNext";
import SvgPause from "../../assets/svg/SvgPause";
import SvgPlay from "../../assets/svg/SvgPlay";
import SvgPrev from "../../assets/svg/SvgPrev";
import { useAppSelector } from "../../hooks/Index";
import { useAction } from "../../hooks/useActions";
import { ITrack } from "../../redux/types/Track";
import ImageW from "../../assets/img/чарли пут 3.png";
import "./style.scss";
import SvgVolumeFull from "../../assets/svg/SvgVolumeFull";
import SvgVolumeNull from "../../assets/svg/SvgVolumeNull";
import SvgVolumeSmall from "../../assets/svg/SvgVolumeSmall";
import SvgVolumeMiddle from "../../assets/svg/SvgVolumeMiddle";

interface IlistMedia {
  listTruck?: ITrack[] | any;
}

let audio: any;

export default function AudioPlayer({ listTruck }: IlistMedia) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pause, volume, active, duration, currentTime } = useAppSelector(
    (state) => state.playReducer
  );

  const {
    activeTrack,
    pauseTrack,
    playTrack,
    setCurrentTime,
    setDuration,
    setVolume,
  } = useAction();

  const setAudio = () => {
    if (active) {
      audio.src = active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
    }
  }, [active]);

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;

    setVolume(Number(e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);

    setCurrentTime(Number(e.target.value));
  };

  const OnClickNext = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % listTruck.length);
    activeTrack(listTruck[currentIndex]);
    playTrack();
    audio.play();
  };

  const OnClickPrev = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 1 ? listTruck.length - 1 : currentIndex - 1
    );
    activeTrack(listTruck[currentIndex]);
    playTrack();
    audio.play();
  };

  useEffect(() => {
    playTrack();
    audio.play();
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <section style={{ marginBottom: "32px" }}>
      <Box display="flex" alignItems="end">
        <Box maxW="176px" h="225px" mr="23px">
          <Image src={ImageW} />
        </Box>
        <Box w="100%">
          <Text mb="32px" fontSize="38.57px">
            {active.name}
          </Text>
          <Box display="flex" mb="32px" alignItems="center">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={changeCurrentTime}
              className="time"
            />
            <Text w="100px" textAlign="end">
              {currentTime} / {duration}
            </Text>
          </Box>

          <Box display="flex" alignItems="center">
            <Box mr="31px">
              <Button bg="gray.600" onClick={OnClickPrev}>
                <SvgPrev />
              </Button>
              <Button bg="gray.600" onClick={play}>
                {pause ? <SvgPlay fill="white" /> : <SvgPause fill="white" />}
              </Button>
              <Button bg="gray.600" onClick={OnClickNext}>
                <SvgNext />
              </Button>
            </Box>

            <Box mr="31px" display="flex" alignItems="center">
              <Box mr="9px" display="flex" alignItems="center">
                {volume === 0 ? (
                  <SvgVolumeNull />
                ) : volume < 40 ? (
                  <SvgVolumeSmall />
                ) : volume < 80 ? (
                  <SvgVolumeMiddle />
                ) : (
                  <SvgVolumeFull />
                )}
              </Box>

              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={changeVolume}
              />
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Button
                rounded="50px"
                px="53px"
                py="9px"
                fontSize="14px"
                mr="11px"
                bg="green"
                textColor="white"
              >
                Купить сейчас
              </Button>
              <Button
                rounded="50px"
                px="53px"
                py="9px"
                fontSize="14px"
                bg="transparent"
                border="1px"
                borderColor="green"
                color="green"
              >
                В корзину
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
