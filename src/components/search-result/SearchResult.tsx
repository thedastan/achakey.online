import { Box, Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import {
  useAction,
  useExcerpAction,
  useTracksAction,
} from "../../hooks/useActions";
import { ITrack } from "../../redux/types";
import { getIdAlums } from "../helper";
import {
  currentIndexAction,
  eventChange,
} from "../playlist/reducer/action-creator";
import MusicForList from "../ui/MusicForList";

export default function SearchResult() {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const { track } = useAppSelector((state) => state.musicReducer);
  const { excerptActiveAction } = useExcerpAction();

  const { pauseTrack } = useAction();
  const { fetchTrack } = useTracksAction();

  const OnChange = (data: ITrack) => {
    excerptActiveAction(data);
    pauseTrack();
  };

  useEffect(() => {
    fetchTrack(`${id}`);
  }, []);

  return (
    <Box minH="90vh" display="flex" justifyContent="center" alignItems="center">
      <Container maxW="1220px">
        <Box mx="auto">
          <MusicForList
            name={track.name}
            music={track}
            onClick={() => OnChange(track)}
          />
        </Box>
      </Container>
    </Box>
  );
}
