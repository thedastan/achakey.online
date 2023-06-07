import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import { excerptPauseAction } from "../components/audio-player/action-creators/excerptPlayer";
import {
  pauseTrack,
  playTrack,
} from "../components/bottom-audio-player/action-creators/Player";
import { useAppSelector } from "../hooks/Index";
import { useExcerpAction } from "../hooks/useActions";

let audio: any;

export default function AudioPlayerExcerpt() {
  const { change } = useAppSelector((state) => state.reducerChange);
  const { volume, active, pause } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const { excerptCurrentTimeAction, excerptDurationAction, excerptPlayAction } =
    useExcerpAction();

  const setAudio = () => {
    if (active) {
      audio.src = active.music_short;
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

  useEffect(() => {
    if (pause) {
      audio.pause();
      pauseTrack();
      excerptPauseAction();
    } else {
      audio.play();
      pauseTrack();
      excerptPlayAction();
    }
  }, [pause]);

  useEffect(() => {
    excerptPlayAction();
    audio.play();
  }, [active]);

  useEffect(() => {
    audio.currentTime = Number(change);
    excerptCurrentTimeAction(Number(change));
  }, [change]);

  return <Box />;
}
