import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import SvgCross from "../../../assets/svg/SvgCross";
import SvgVolumeFull from "../../../assets/svg/SvgVolumeFull";
import SvgVolumeMiddle from "../../../assets/svg/SvgVolumeMiddle";
import SvgVolumeNull from "../../../assets/svg/SvgVolumeNull";
import SvgVolumeSmall from "../../../assets/svg/SvgVolumeSmall";
import { useAppSelector } from "../../../hooks/Index";
import { useAction } from "../../../hooks/useActions";
import "../style.css";
import "./style.scss";

interface IPropsVolume {
  className: string;
  setActiveVolume: (value: boolean) => void;
  audio: any;
}

export default function VolumePopup({
  className,
  setActiveVolume,
  audio,
}: IPropsVolume) {
  const { volume, active } = useAppSelector((state) => state.playReducer);

  const { setVolume } = useAction();

  const setAudio = () => {
    if (active) {
      audio.src = active.audio;
      audio.volume = volume / 100;
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
    }
  }, [active]);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;

    setVolume(Number(e.target.value));
  };

  if (!active) {
    return null;
  }

  function handleClose(e: any) {
    e.stopPropagation();

    setActiveVolume(false);
  }

  return (
    <Box
      position="fixed"
      left="0"
      right="0"
      className={`volume ${className}`}
      bg="#666666"
      px="10px"
      pt="30px"
      pb="50px"
      roundedTop="10px"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" w="80vw">
          <Box mr="9px" alignItems="center">
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
            style={{ width: "100%" }}
          />
        </Box>
        <Box onClick={handleClose}>
          <SvgCross />
        </Box>
      </Box>
    </Box>
  );
}
