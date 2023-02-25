import { Box, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { useAction } from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../../pages/allPlaylist/reducer/action-creator";
import { ITrack } from "../../redux/types/Track";
import MusicForList from "../ui/MusicForList";

interface ITrackList {
  tracks: ITrack[];
}

export default function TrackList({ tracks }: ITrackList) {
  const { activeTrack } = useAction();
  const dispatch = useAppDispatch();

  const listTable = [
    {
      text: "Трек",
    },
    {
      text: "Исполнители",
    },
    {
      text: "Длительность",
    },
    {
      text: "В корзину",
    },
  ];

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    // setCurrentIndex(index);
    dispatch(currentIndexAction(index));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        {listTable.map((item, index) => (
          <Text key={index} fontWeight="600" textColor="white">
            {item.text}
          </Text>
        ))}
      </Box>
      <Box>
        {tracks.map((el, index) => (
          <MusicForList
            name={el?.name}
            key={index}
            music={el}
            onClick={() => OnChange(el, index)}
          />
        ))}
      </Box>
    </Box>
  );
}
