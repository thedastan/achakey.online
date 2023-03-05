import { Box } from "@chakra-ui/react";
import { Key, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import {
  useAction,
  useExcerpAction,
  useTracksAction,
} from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../../pages/all-playlist/reducer/action-creator";
import { ITrack } from "../../redux/types";
import ListForAlbumOrTracks from "../ui/ListForAlbumOrTracks";

export default function MyTracks() {
  const dispatch = useAppDispatch();
  const { fetchTracks } = useTracksAction();
  const { activeTrack } = useAction();
  const { excerptPauseAction } = useExcerpAction();
  const { tracks } = useAppSelector(
    (state: { musicReducer: any }) => state.musicReducer
  );

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    excerptPauseAction();
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <Box minH="90vh">
      {tracks.map((item: ITrack, index: Key | any) => (
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
