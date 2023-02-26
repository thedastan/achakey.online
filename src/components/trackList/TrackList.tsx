import { Box, Text } from "@chakra-ui/react";
import { useAppDispatch } from "../../hooks/Index";
import { useAction } from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../../pages/allPlaylist/reducer/action-creator";
import { ITrack } from "../../redux/types/Track";
import MusicForList from "../ui/MusicForList";

interface ITrackList {
  tracks: ITrack[];
  allTracks?: boolean;
}

export default function TrackList({ tracks, allTracks }: ITrackList) {
  const { activeTrack } = useAction();
  const dispatch = useAppDispatch();

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
  };

  return (
    <Box
      minH={!allTracks ? "90vh" : "100vh"}
      mx="auto"
      display="flex"
      flexDir="column"
      justifyContent="center"
    >
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="600" textColor="white" w="25vw">
            {allTracks ? "Все треки" : "Все Альбомы"}
          </Text>
          <Text fontWeight="600" textColor="white" textAlign="end" pr="28px">
            Отрывок
          </Text>
          <Text fontWeight="600" textColor="white">
            Цена
          </Text>
          <Text fontWeight="600" textColor="white">
            В корзину
          </Text>
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
    </Box>
  );
}
