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
import SvgRandom from "../../assets/svg/SvgRandom";
import SvgLoop from "../../assets/svg/SvgLoop";
import SvgActiveLoop from "../../assets/svg/SvgActiveLoop";

interface IlistMedia {
  listTruck?: ITrack[] | any;
  setCurrentIndex: any;
  currentIndex: number;
  eventChange: boolean;
  setEventChange: any;
}

let audio: HTMLAudioElement | any;

export default function AudioPlayer({
  listTruck,
  currentIndex,
  eventChange,
  setCurrentIndex,
  setEventChange,
}: IlistMedia) {
  const { pause, volume, active, duration, currentTime } = useAppSelector(
    (state) => state.playReducer
  );

  const [random, setRandom] = useState(false);
  const [loop, setLoop] = useState(false);

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
    setEventChange(false);
    setCurrentIndex(
      (currentIndex: number) => (currentIndex + 1) % listTruck.length
    );

    activeTrack(
      listTruck[
        eventChange
          ? listTruck.length - 1 === currentIndex
            ? 0
            : currentIndex + 1
          : listTruck.length - 1 === currentIndex
          ? 0
          : currentIndex + 1
      ]
    );
  };

  const OnClickPrev = () => {
    setCurrentIndex((index: number) =>
      index === 0 ? listTruck.length - 1 : index - 1
    );
    activeTrack(
      listTruck[
        eventChange
          ? currentIndex - 1
          : currentIndex === 0
          ? listTruck.length - 1
          : currentIndex - 1
      ]
    );
    setEventChange(false);
  };

  const OnClickRandom = () => {
    let currentValue = listTruck[Math.floor(Math.random() * listTruck.length)];

    activeTrack(currentValue);
    playTrack();
    setRandom(!random);
  };

  function startTimer() {
    let seconds: any = currentTime % 60;
    let minutes: any = Math.floor(currentTime / 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  function currentTimerAudio() {
    let minutes: any = Math.floor(duration / 60);
    let seconds: any = duration % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  const loopActive = () => {
    setLoop(!loop);
  };

  useEffect(() => {
    playTrack();
    audio.play();
  }, [active]);

  useEffect(() => {
    loop
      ? audio.addEventListener("ended", () => {
          playTrack();
          audio.play();
        })
      : audio.addEventListener("ended", () => {
          audio.currentTime = 0;
          audio.pause();
        });
  }, [loop]);

  if (!active) {
    return null;
  }

  return (
    <section style={{ marginBottom: "32px", background: "transparent" }}>
      <Box display="flex" alignItems="end">
        <Box maxW="176px" h="225px" mr="23px">
          <Image src={ImageW} />
        </Box>
        <Box w="100%">
          <Text mb="32px" fontSize="38.57px" color="white">
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
            <Text w="120px" textAlign="end" textColor="white">
              {startTimer()} / {currentTimerAudio()}
            </Text>
          </Box>

          <Box display="flex" alignItems="center">
            <Box mr="31px">
              <Button
                onClick={OnClickRandom}
                bg="transparent"
                rounded="50px"
                p="0"
                mr="5px"
                colorScheme="none"
              >
                <SvgRandom fill={random ? "#0EEB24" : "white"} />
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={OnClickPrev}
                p="0"
              >
                <SvgPrev />
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={play}
                p="0"
                mx="2px"
              >
                {pause ? <SvgPlay fill="white" /> : <SvgPause fill="white" />}
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={OnClickNext}
                p="0"
              >
                <SvgNext />
              </Button>
              <Button
                onClick={loopActive}
                bg="transparent"
                rounded="50px"
                p="0"
                ml="5px"
                colorScheme="none"
              >
                {!loop ? (
                  <SvgLoop fill={loop ? "#0EEB24" : "white"} />
                ) : (
                  <SvgActiveLoop />
                )}
              </Button>
            </Box>

            <Box mr="31px" display="flex" alignItems="center">
              <Box mr="9px" display="flex" alignItems="center">
                {volume === 0 ? (
                  <SvgVolumeNull />
                ) : volume < 35 ? (
                  <SvgVolumeSmall />
                ) : volume < 70 ? (
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

            <Box display="flex" justifyContent="space-between" ml="auto">
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
