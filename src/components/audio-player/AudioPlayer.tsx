import { Button } from "@chakra-ui/button";
import { Box, Container, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import SvgNext from "../../assets/svg/SvgNext";
import SvgPause from "../../assets/svg/SvgPause";
import SvgPlay from "../../assets/svg/SvgPlay";
import SvgPrev from "../../assets/svg/SvgPrev";

import { useAppSelector } from "../../hooks/Index";
import { useAction } from "../../hooks/useActions";
import { ITrack } from "../../redux/types/Track";

let audio: any;

interface IlistMedia {
  listTruck?: ITrack[] | any;
}

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
      currentIndex === 0 ? listTruck.length - 1 : currentIndex - 1
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
    <section>
      <Box>
        <Container maxW="1220px" mb="40px">
          <Box>
            <Button bg="gray.600" onClick={play}>
              {pause ? <SvgPlay /> : <SvgPause />}
            </Button>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={changeVolume}
            />
          </Box>
          <Box>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={changeCurrentTime}
            />
          </Box>
        </Container>
        <Button bg="gray.600" onClick={OnClickPrev}>
          <SvgPrev />
        </Button>
        <Button bg="gray.600" onClick={OnClickNext}>
          <SvgNext />
        </Button>
      </Box>
    </section>
  );
}
