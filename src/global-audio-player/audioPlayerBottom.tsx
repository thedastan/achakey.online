import { useEffect } from "react";
import { pauseTrack } from "../components/bottom-audio-player/action-creators/Player";
import { useAppSelector } from "../hooks/Index";
import {
  useAction,
  useExcerpAction,
  useTracksAction,
} from "../hooks/useActions";
import axios from "axios";

let audio: HTMLAudioElement | any;

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

  const { pause, volume, active } = useAppSelector(
    (state) => state.playReducer
  );

  const { changeTime, changeVolume } = useAppSelector(
    (state) => state.reducerChangeTimePlayerBottom
  );

  const { playTrack, setCurrentTime, setDuration } = useAction();

  //{api}api/myMusics/?textFileUrl=api.achakey.online/media/jax-0214-sebelep.txt

  const setAudio = async () => {

    if (active) {
      // axios.get('http://localhost:8080/get_music/{active.music}').then(({data})=> {
      //   data // path ti file ---> achakey/src/qwertyui.mp3 |
      // })
      const url = `${active?.music}`
      // const url = 'https://example.com/some-page';
      fetch(`https://localhost:8080/get_music?url=${encodeURIComponent(url)}`).then((data)=> {
        console.log(data)
      })
      // fetch('/get_music', {
      //   method: 'GET',
      //   headers: {
      //     'X-Request-URL': url
      //   }
      // }).then((data)=> {
      //   console.log(data , 'data')
      //   // audio.src = '';
      //   // audio.volume = volume / 100;
      //   // audio.onloadedmetadata = () => {
      //   //   setDuration(Math.ceil(audio.duration));
      //   // };
      //   // audio.ontimeupdate = () => {
      //   //   setCurrentTime(Math.ceil(audio.currentTime));
      //   // };
      // })
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
    playTrack();
    audio.play();
  }, [active]);

  useEffect(() => {
    audio.currentTime = Number(changeTime);
    setCurrentTime(Number(changeTime));
  }, [changeTime]);

  useEffect(() => {
    audio.volume = Number(changeVolume) / 100;
  }, [changeVolume]);

  useEffect(() => {
    if (pause) {
      pauseTrack();
      audio.pause();
      excerptPauseAction();
    } else {
      playTrack();
      audio.play();
      excerptPauseAction();
    }
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

  return <div></div>;
}
