import { Box,  } from "@chakra-ui/react";
import { useAppDispatch } from "../../hooks/Index";
import { useAction, useExcerpAction } from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../../pages/allPlaylist/reducer/action-creator";
import { ITrack } from "../../redux/types/Track";
import ListForAlbumOrTracks from "../ui/ListForAlbumOrTracks";

export default function MyTracks() {
  const dispatch = useAppDispatch();

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

  const { activeTrack } = useAction();
  const { excerptPauseAction } = useExcerpAction();

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    excerptPauseAction();
  };

  return (
    <Box minH="90vh">
      {listTruck.map((item, index) => (
        <ListForAlbumOrTracks
          music={item}
          key={index}
          index={index + 1}
          name={item.name}
          onClick={() => OnChange(item, index)}
        />
      ))}
    </Box>
  );
}
