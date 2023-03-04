import { Box, Container, Text } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  currentIndexAction,
  eventChange,
} from "../../pages/all-playlist/reducer/action-creator";
import SvgActiveLoop from "../../assets/svg/SvgActiveLoop";
import SvgLoop from "../../assets/svg/SvgLoop";
import SvgNext from "../../assets/svg/SvgNext";
import SvgPause from "../../assets/svg/SvgPause";
import SvgPlay from "../../assets/svg/SvgPlay";
import SvgPrev from "../../assets/svg/SvgPrev";
import SvgRandom from "../../assets/svg/SvgRandom";
import SvgVolumeFull from "../../assets/svg/SvgVolumeFull";
import SvgVolumeMiddle from "../../assets/svg/SvgVolumeMiddle";
import SvgVolumeNull from "../../assets/svg/SvgVolumeNull";
import SvgVolumeSmall from "../../assets/svg/SvgVolumeSmall";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { useAction, useExcerpAction } from "../../hooks/useActions";
import Jax from "../../assets/img/Жакс.png";

import "./style.css";
import VolumePopup from "./popup/VolumePopup";

let audio: HTMLAudioElement | any;

export default function BottomPlayer() {
  const listTruck = [
    {
      _id: "1",
      name: "Наряд ангела",
      audio: require("../../assets/audio/naryd_angela.mp3"),
    },
    {
      _id: "2",
      name: "Богатами",
      audio: "https://dl2.mp3party.net/online/10092705.mp3",
    },
    {
      _id: "3",
      name: "Слишком плохой для тебя",
      audio: require("../../assets/audio/rick.mp3"),
    },
  ];

  const objAlbum = {
    title: "Lilia",
    listAlbums: [
      {
        _id: "1",
        name: "Волчий вой",
        audio:
          "https://muzes.net/uploads/music/2022/10/Ulukmanapo_Volchij_voj.mp3",
        excerpt: "00:30",
        price: "90c",
      },
      {
        _id: "2",
        name: "la liga",
        audio: "https://dl2.mp3party.net/online/10068051.mp3",
        excerpt: "00:30",
        price: "90c",
      },
      {
        _id: "3",
        name: "Герой",
        audio:
          "https://uztop.net/uploads/music/2023/02/FREEMAN_996_Geroj_OST_RAZBOI.mp3",
        excerpt: "00:30",
        price: "90c",
      },
      {
        _id: "10",
        name: "Ойлорумда",
        audio:
          "https://mp3fly.net/uploads/files/mp3/02-2021/1613108060_Bakr_-_Oylorumda.mp3",
        excerpt: "00:30",
        price: "90c",
      },
      {
        _id: "5",
        name: "Силуэт",
        audio: require("../../assets/audio/bakr-tvoj-siluet-igraet-na-glazah.mp3"),
        excerpt: "00:30",
        price: "90c",
      },
    ],
  };

  const listAlbums = objAlbum.listAlbums;

  const dispatch = useAppDispatch();
  const { event } = useAppSelector((state) => state.eventReducer);
  const { currentIndex: indexCurrent } = useAppSelector(
    (state) => state.currentIndexReducer
  );

  const { tabBoolean } = useAppSelector((state) => state.reducerTabBoolean);
  const { pause, volume, active, duration, currentTime } = useAppSelector(
    (state) => state.playReducer
  );

  let randomIndex = tabBoolean
    ? Math.floor(Math.random() * listTruck.length)
    : Math.floor(Math.random() * listAlbums.length);

  let randomMusic = tabBoolean
    ? listTruck[randomIndex]
    : listAlbums[randomIndex];

  const [random, setRandom] = useState(false);
  const [loop, setLoop] = useState(false);
  const [allLoop, setAllLoop] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [activeVolume, setActiveVolume] = useState(false);

  const { excerptPauseAction } = useExcerpAction();

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
      excerptPauseAction();
    } else {
      pauseTrack();
      audio.pause();
      excerptPauseAction();
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
    setNext(true);
    dispatch(eventChange(false));

    dispatch(
      currentIndexAction(
        tabBoolean
          ? listTruck.length - 1 === indexCurrent
            ? 0
            : indexCurrent + 1
          : listAlbums.length - 1 === indexCurrent
          ? 0
          : indexCurrent + 1
      )
    );

    activeTrack(
      tabBoolean
        ? listTruck[
            event
              ? listTruck.length - 1 === indexCurrent
                ? 0
                : indexCurrent + 1
              : listTruck.length - 1 === indexCurrent
              ? 0
              : indexCurrent + 1
          ]
        : listAlbums[
            event
              ? listAlbums.length - 1 === indexCurrent
                ? 0
                : indexCurrent + 1
              : listAlbums.length - 1 === indexCurrent
              ? 0
              : indexCurrent + 1
          ]
    );

    console.log(
      tabBoolean
        ? listTruck[
            event
              ? listTruck.length - 1 === indexCurrent
                ? 0
                : indexCurrent + 1
              : listTruck.length - 1 === indexCurrent
              ? 0
              : indexCurrent + 1
          ]
        : listAlbums[
            event
              ? listAlbums.length - 1 === indexCurrent
                ? 0
                : indexCurrent + 1
              : listAlbums.length - 1 === indexCurrent
              ? 0
              : indexCurrent + 1
          ],
      "IF"
    );
  };

  const OnClickPrev = () => {
    setPrev(true);

    dispatch(
      currentIndexAction(
        indexCurrent === 0
          ? tabBoolean
            ? listTruck.length - 1
            : listAlbums.length - 1
          : indexCurrent - 1
      )
    );

    activeTrack(
      tabBoolean
        ? listTruck[
            event
              ? indexCurrent - 1
              : indexCurrent === 0
              ? listTruck.length - 1
              : indexCurrent - 1
          ]
        : listAlbums[
            event
              ? indexCurrent - 1
              : indexCurrent === 0
              ? listAlbums.length - 1
              : indexCurrent - 1
          ]
    );

    dispatch(eventChange(false));
  };

  const OnClickRandom = () => {
    playTrack();
    setRandom(!random);
    setAllLoop(false);
    setLoop(false);
  };

  const loopActive = () => {
    if (allLoop) {
      setLoop(true);
      setAllLoop(false);
    } else if (loop) {
      setAllLoop(false);
      setLoop(false);
    } else {
      setAllLoop(true);
      setLoop(false);
    }
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
    setTimeout(() => {
      setPrev(false);
      setNext(false);
    }, 200);
  }, [next, prev]);

  useEffect(() => {
    playTrack();
    audio.play();
  }, [active]);

  useEffect(() => {
    if (random) {
      if (currentTime === duration) {
        dispatch(currentIndexAction(randomIndex));
        activeTrack(randomMusic);
      }
    }
  }, [currentTime, random]);

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

  useEffect(() => {
    if (!next || prev) {
      if (allLoop) {
        if (duration) {
          if (currentTime === duration) {
            dispatch(eventChange(false));

            dispatch(
              currentIndexAction(
                tabBoolean
                  ? listTruck.length - 1
                  : listAlbums.length - 1 === indexCurrent
                  ? 0
                  : indexCurrent + 1
              )
            );

            activeTrack(
              tabBoolean
                ? listTruck[
                    event
                      ? listTruck.length - 1 === indexCurrent
                        ? 0
                        : indexCurrent + 1
                      : listTruck.length - 1 === indexCurrent
                      ? 0
                      : indexCurrent + 1
                  ]
                : listAlbums[
                    event
                      ? listAlbums.length - 1 === indexCurrent
                        ? 0
                        : indexCurrent + 1
                      : listAlbums.length - 1 === indexCurrent
                      ? 0
                      : indexCurrent + 1
                  ]
            );
          }
        }
      }
    }
  }, [next, prev, allLoop, currentTime]);

  if (!active) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      left={{ base: "0", md: "100px" }}
      right="0"
      bg="rgba(11, 11, 11, 0.49)"
      mx="auto"
      rounded="0px"
      className="blur"
    >
      <Box display="flex" alignItems="center">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={changeCurrentTime}
          className="time"
        />
      </Box>
      <Box display="flex" justifyContent="space-between" py="11px">
        <Image src={Jax} maxW="74px" display={{ base: "none", md: "block" }} />
        <Box display="flex" alignItems="center">
          <Box mr="31px">
            <Button
              onClick={OnClickRandom}
              bg="transparent"
              rounded="50px"
              p="0"
              mr="5px"
              colorScheme="none"
              className="random"
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
                <SvgLoop fill={allLoop ? "#0EEB24" : "white"} />
              ) : (
                <SvgActiveLoop />
              )}
            </Button>
          </Box>
        </Box>

        <Box
          mr="31px"
          display="flex"
          flexDir={{ base: "row-reverse", md: "column" }}
          alignItems="center"
        >
          <Text textAlign="end" textColor="white" pb="5px" fontSize="12px">
            {startTimer()} / {currentTimerAudio()}
          </Text>
          <Box display="flex" alignItems="center">
            <Box
              mr="9px"
              display={{ base: "none", md: "flex" }}
              alignItems="center"
            >
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
            <Box
              display={{ base: "block", md: "none" }}
              onClick={() => setActiveVolume(true)}
              cursor="pointer"
            >
              <SvgVolumeMiddle />
            </Box>

            <Box display={{ base: "none", md: "block" }} h="30px">
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={changeVolume}
                style={{ marginTop: "-10px" }}
              />
            </Box>
            <VolumePopup
              className={activeVolume ? "transform" : ""}
              setActiveVolume={setActiveVolume}
              audio={audio}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
