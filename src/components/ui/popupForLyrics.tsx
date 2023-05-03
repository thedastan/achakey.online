import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  currentIndexAction,
  eventChange,
} from "../../containers/excerptPlaylist/reducer/action-creator";
import SvgActiveLoop from "../../assets/svg/SvgActiveLoop";
import SvgLoop from "../../assets/svg/SvgLoop";
import SvgForAlbumPause from "../../assets/svg/SvgForAlbumPause";
import SvgForAlbumNext from "../../assets/svg/SvgForAlbumNext";
import SvgForAlbumPrev from "../../assets/svg/SvgForAlbumPrev";
import SvgRandom from "../../assets/svg/SvgRandom";
import {
  useAction,
  useExcerpAction,
  useTracksAction,
} from "../../hooks/useActions";
import {
  changeTimeAction,
  changeVolumeAction,
  loopAction,
} from "../../global-audio-player/action-creators";
import SvgPlay from "../../assets/svg/SvgPlay";
import SvgAllAlbums from "../../assets/svg/SvgAllList";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";

interface IPopup {
  image?: string;
  text?: string;
  setOpenPopup: (value: boolean) => void;
  className?: string;
}

export default function PopupForLyrics({
  image,
  text,
  setOpenPopup,
  className,
}: IPopup) {
  const { tabBoolean } = useAppSelector((state) => state.reducerTabBoolean);
  const { myAlbums: objAlbum, myTracks: listTruck } = useAppSelector(
    (state) => state.musicReducer
  );
  const albumIndex = useAppSelector(
    (state) => state.reducerIndexForAlbums.album
  );
  const { fetchAlbums, fetchTracks } = useTracksAction();

  const listAlbums = objAlbum.map((el) => el);

  useEffect(() => {
    fetchAlbums();
    fetchTracks();
  }, []);
  const dispatch = useAppDispatch();
  const { event } = useAppSelector((state) => state.eventReducer);
  const { loop } = useAppSelector(
    (state) => state.reducerChangeTimePlayerBottom
  );
  const { currentIndex: indexCurrent } = useAppSelector(
    (state) => state.currentIndexReducer
  );

  const { pause, volume, active, duration, currentTime } = useAppSelector(
    (state) => state.playReducer
  );

  let randomIndex = tabBoolean
    ? currentTime === duration
      ? Math.floor(Math.random() * listTruck.length)
      : indexCurrent
    : currentTime === duration
    ? Math.floor(Math.random() * listAlbums[albumIndex]?.music.length)
    : indexCurrent;

  let randomMusic = tabBoolean
    ? listTruck[randomIndex]
    : listAlbums[albumIndex]?.music[randomIndex];

  const [random, setRandom] = useState(false);
  const [allLoop, setAllLoop] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const { excerptPauseAction } = useExcerpAction();

  const { activeTrack, pauseTrack, playTrack, setCurrentTime, setVolume } =
    useAction();

  const play = () => {
    if (pause) {
      playTrack();
      excerptPauseAction();
    } else {
      pauseTrack();
      excerptPauseAction();
    }
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTimeAction(Number(e.target.value)));

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
        : listAlbums[albumIndex].music[
            event
              ? listAlbums[albumIndex].music.length - 1 === indexCurrent
                ? 0
                : indexCurrent + 1
              : listAlbums[albumIndex].music.length - 1 === indexCurrent
              ? 0
              : indexCurrent + 1
          ]
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
        : listAlbums[albumIndex].music[
            event
              ? indexCurrent - 1
              : indexCurrent === 0
              ? listAlbums[albumIndex].music.length - 1
              : indexCurrent - 1
          ]
    );

    dispatch(eventChange(false));
  };

  const loopActive = () => {
    if (allLoop) {
      dispatch(loopAction(true));
      setAllLoop(false);
      setRandom(false);
    } else if (loop) {
      setAllLoop(false);
      dispatch(loopAction(false));
      setRandom(true);
    } else if (random) {
      setRandom(false);
      setAllLoop(false);
      dispatch(loopAction(false));
    } else {
      setAllLoop(true);
      dispatch(loopAction(false));
      setRandom(false);
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

  return (
    <Box
      className={`lyrics ${className}`}
      textColor="white"
      px="35px"
      py="100px"
      roundedTop="30px"
      bg="#1D1D20"
      left="0"
      right="0"
      top="0"
      bottom="0"
      pos="fixed"
      pl={{ base: "35px", md: "15%" }}
      zIndex="4"
    >
      <Box h="90vh" overflowY="auto" pb="50%" pt="20px">
        <Box
          px={{ base: "15px", sm: "35px" }}
          py={{ base: "15px", sm: "35px" }}
          rounded="30px"
          bg="rgba(255, 255, 255, 0.08)"
        >
          <Box maxW="279px" h="279px" mx="auto" objectFit="cover">
            <Image
              rounded={{ base: "22px", sm: "22px" }}
              src={image}
              h="100%"
              w="100%"
              objectFit="cover"
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            pt="30px"
            pb="37px"
          >
            <Box position="absolute" left="0">
              <Button
                onClick={loopActive}
                bg="transparent"
                rounded="50px"
                p="0"
                ml="5px"
                colorScheme="none"
              >
                {allLoop ? (
                  <SvgLoop fill={allLoop && "#0EEB24"} />
                ) : loop ? (
                  <SvgActiveLoop />
                ) : random ? (
                  <SvgRandom fill={random ? "#0EEB24" : "white"} />
                ) : (
                  <SvgLoop fill={"white"} />
                )}
              </Button>
            </Box>
            <Box>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={OnClickPrev}
                p="0"
              >
                <SvgForAlbumPrev />
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={play}
                p="0"
                mx="2px"
              >
                {pause ? (
                  <SvgPlay fill="white" />
                ) : (
                  <SvgForAlbumPause fill="white" />
                )}
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={OnClickNext}
                p="0"
              >
                <SvgForAlbumNext />
              </Button>
            </Box>
            <Box
              position="absolute"
              right="0"
              onClick={() => setOpenPopup(false)}
            >
              <SvgAllAlbums />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" pb="11px">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={changeCurrentTime}
              className="input"
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="11px">{startTimer()}</Text>
            <Text fontSize="11px">{currentTimerAudio()}</Text>
          </Box>
        </Box>
        <Text fontSize="14px" lineHeight="19.88px" pt="30px" pb="100px">
          <p>
            {text?.split("\r\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </p>
        </Text>
      </Box>
    </Box>
  );
}
