import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useEffect } from "react";

import {
  currentIndexAction,
  eventChange,
} from "../../pages/allPlaylist/reducer/action-creator";

import SvgNext from "../../assets/svg/SvgNext";
import SvgPause from "../../assets/svg/SvgPause";
import SvgPlay from "../../assets/svg/SvgPlay";
import SvgPrev from "../../assets/svg/SvgPrev";
import { useAction, useExcerpAction } from "../../hooks/useActions";
import { ITrack } from "../../redux/types/Track";
import ImageW from "../../assets/img/чарли пут 3.png";
import SvgVolumeFull from "../../assets/svg/SvgVolumeFull";
import SvgVolumeNull from "../../assets/svg/SvgVolumeNull";
import SvgVolumeSmall from "../../assets/svg/SvgVolumeSmall";
import SvgVolumeMiddle from "../../assets/svg/SvgVolumeMiddle";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import "./style.scss";

interface IlistMedia {
  listTruck?: ITrack[] | any;
}

let audio: HTMLAudioElement | any;

export default function AudioPlayer({ listTruck }: IlistMedia) {
  const dispatch = useAppDispatch();
  const { event } = useAppSelector((state) => state.eventReducer);
  const { currentIndex: indexCurrent } = useAppSelector(
    (state) => state.currentIndexReducer
  );

  const { pause, volume, active, duration, currentTime } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const { pauseTrack } = useAction();

  const {
    excerptActiveAction,
    excerptPauseAction,
    excerptPlayAction,
    excerptCurrentTimeAction,
    excerptDurationAction,
    excerptVolumeAction,
  } = useExcerpAction();

  const setAudio = () => {
    if (active) {
      audio.src = active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        excerptDurationAction(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        excerptCurrentTimeAction(Math.ceil(audio.currentTime));
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
      excerptPlayAction();
      audio.play();
      pauseTrack();
    } else {
      excerptPauseAction();
      audio.pause();
      pauseTrack();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;

    excerptVolumeAction(Number(e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);

    excerptCurrentTimeAction(Number(e.target.value));
  };

  const OnClickNext = () => {
    dispatch(eventChange(false));

    dispatch(
      currentIndexAction(
        listTruck.length - 1 === indexCurrent ? 0 : indexCurrent + 1
      )
    );

    excerptActiveAction(
      listTruck[
        event
          ? listTruck.length - 1 === indexCurrent
            ? 0
            : indexCurrent + 1
          : listTruck.length - 1 === indexCurrent
          ? 0
          : indexCurrent + 1
      ]
    );
  };

  const OnClickPrev = () => {
    dispatch(
      currentIndexAction(
        indexCurrent === 0 ? listTruck.length - 1 : indexCurrent - 1
      )
    );

    excerptActiveAction(
      listTruck[
        event
          ? indexCurrent - 1
          : indexCurrent === 0
          ? listTruck.length - 1
          : indexCurrent - 1
      ]
    );

    dispatch(eventChange(false));
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

  useEffect(() => {
    excerptPlayAction();
    audio.play();
  }, [active]);

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
