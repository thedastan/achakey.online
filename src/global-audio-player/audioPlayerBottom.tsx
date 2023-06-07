import { useEffect } from "react";
import { pauseTrack } from "../components/bottom-audio-player/action-creators/Player";
import { useAppSelector } from "../hooks/Index";
import {
  useAction,
  useExcerpAction,
  useTracksAction,
} from "../hooks/useActions";
import axios from "axios";

let audio: HTMLAudioElement;

export default function AudioPlayerBottom() {
  const { fetchAlbums, fetchTracks } = useTracksAction();
  const { excerptPauseAction } = useExcerpAction();

  const { loop } = useAppSelector(
    (state) => state.reducerChangeTimePlayerBottom
  );
  useEffect(() => {
    fetchAlbums();
    fetchTracks();
  }, []);

  const { pause, active } = useAppSelector((state) => state.playReducer);

  const { changeTime, changeVolume } = useAppSelector(
    (state) => state.reducerChangeTimePlayerBottom
  );

  const { playTrack, setCurrentTime, setDuration } = useAction();

  const setAudio = async () => {
    if (active) {
      const textFileUrl = `${active?.music}`;
      const url = "http://localhost:8080/";
      try {
        const { data } = await axios(
          `${url}api/myMusics?textFileUrl=${textFileUrl}`
        );
        audio.src = data.mp3Data;
        audio.onloadedmetadata = () => {
          setDuration(Math.ceil(audio.duration));
        };
        audio.ontimeupdate = () => {
          setCurrentTime(Math.ceil(audio.currentTime));
        };
        audio.play();
      } catch (e) {
        console.log(e, "error");
      }
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
    }
  }, [active?.id]);

  useEffect(() => {
    playTrack();
    audio.play();
  }, [active?.id]);

  useEffect(() => {
    audio.currentTime = Number(changeTime);
    setCurrentTime(Number(changeTime));
  }, [changeTime]);

  useEffect(() => {
    audio.volume = Number(changeVolume) / 100;
  }, [changeVolume]);

  useEffect(() => {
    if (pause) {
      audio.pause();
      pauseTrack();
    } else {
      audio.play();
      playTrack();
    }
    excerptPauseAction();
  }, [pause]);

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

  return <div />;
}
