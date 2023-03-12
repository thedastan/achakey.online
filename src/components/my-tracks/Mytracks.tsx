
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
} from "../playlist/reducer/action-creator";
import { ITrack } from "../../redux/types";
import ListForAlbumOrTracks from "../ui/ListForAlbumOrTracks";

export default function MyTracks() {
  const dispatch = useAppDispatch();
  const { fetchMyTracks } = useTracksAction();
  const { activeTrack } = useAction();
  const { excerptPauseAction } = useExcerpAction();
  const { myTracks } = useAppSelector((state) => state.musicReducer);

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    excerptPauseAction();
  };

  useEffect(() => {
    fetchMyTracks();
  }, []);

  return (
    <Box minH="90vh">
      {myTracks.map((item: ITrack, index: Key | any) => (
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
