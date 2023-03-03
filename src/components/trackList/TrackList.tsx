import { Box, Container, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { useAction, useExcerpAction } from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../../pages/allPlaylist/reducer/action-creator";
import { ITrack } from "../../redux/types/Track";
import MusicForList from "../ui/MusicForList";
import "./style.scss";

interface ITrackList {
  tracks: ITrack[];
  allTracks?: boolean;
}

export default function TrackList({ tracks, allTracks }: ITrackList) {
  const { excerptActiveAction } = useExcerpAction();
  const { pauseTrack } = useAction();
  const dispatch = useAppDispatch();

  const OnChange = (data: ITrack, index: number) => {
    excerptActiveAction(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    pauseTrack();
  };

  return (
    <Container maxW="1220px">
      <Box
        h="437px"
        mx="auto"
        display="flex"
        flexDir="column"
        justifyContent="start"
        pl={{ base: "0", md: "4%", lg: "2%", xl: "1%" }}
        overflowY="scroll"
        className="scroll"
      >
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="600" textColor="white" w="25vw">
              {allTracks ? "Все треки" : "Все Альбомы"}
            </Text>
            <Text
              fontWeight="600"
              textColor="white"
              textAlign="end"
              pr="28px"
              display={{ base: "none", md: "block" }}
            >
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
    </Container>
  );
}
