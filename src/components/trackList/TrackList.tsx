import { Box, Text } from "@chakra-ui/react";
import { useAction } from "../../hooks/useActions";
import { ITrack } from "../../redux/types/Track";
import MusicForList from "../ui/MusicForList";

interface ITrackList {
  tracks: ITrack[];
  setCurrentIndex?: any;
  setEventChange?: any;
}

export default function TrackList({
  tracks,
  setCurrentIndex,
  setEventChange,
}: ITrackList) {
  const { activeTrack } = useAction();

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

  const OnChange = (data: ITrack, index: any) => {
    setCurrentIndex(index);
    activeTrack(data);
    setEventChange(true);
  };

  // tracks.length === index + 1 ? index : index + 1;

  return (
    <Box bg="transparent">
      <Box display="flex" justifyContent="space-between">
        {listTable.map((item, index) => (
          <Text key={index} fontWeight="600" color="white">
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
        {tracks.map((el) => (
          <Box>{el.name}</Box>
        ))}
      </Box>
    </Box>
  );
}
