import { Box, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";

import {
  useAction,
  useActionBasket,
  useExcerpAction,
} from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../excerptPlaylist/reducer/action-creator";
import { ITrack } from "../../redux/types";
import MusicForList from "../../components/ui/MusicForList";
import { getIdAlums } from "../../components/helper";
import { useEffect } from "react";

interface ITrackList {
  tracks: ITrack[];
  allTracks?: boolean;
}

export default function ExcerptTrackList({ tracks, allTracks }: ITrackList) {
  const { excerptActiveAction, excerptForAlbumAction } = useExcerpAction();
  const { fetchBasket } = useActionBasket();

  const { pauseTrack } = useAction();
  const dispatch = useAppDispatch();

  const OnChange = (data: ITrack, index: number) => {
    excerptActiveAction(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    pauseTrack();
    {
      window.location.pathname === "/excerpts/details/" + getIdAlums()
        ? excerptForAlbumAction(true)
        : excerptForAlbumAction(false);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  return (
    <Box
      h="645px"
      mx="auto"
      display="flex"
      flexDir="column"
      justifyContent="start"
      // className="scroll"
    >
      <Box>
        <Box
          display="flex"
          justifyContent={{ base: "center", md: "space-between" }}
        >
          <Text
            fontWeight="600"
            textColor="white"
            w={{ base: "100%", md: "25vw" }}
            textAlign={{ base: "center", md: "start" }}
            fontSize={{ base: "20px", md: "14px" }}
            display={
              window.location.pathname === "/excerpts/details/" + getIdAlums()
                ? "block"
                : { base: "none", md: "block" }
            }
          >
            {allTracks ? "Все треки" : "Трек альбомы"}
          </Text>
          <Text
            fontWeight="600"
            textColor="white"
            textAlign="end"
            pr="28px"
            display={{ base: "none", md: "block" }}
            fontSize="14px"
          >
            Отрывок
          </Text>
          <Text
            fontWeight="600"
            textColor="white"
            display={{ base: "none", md: "block" }}
            fontSize="14px"
          >
            Цена
          </Text>
          <Text
            fontWeight="600"
            textColor="white"
            display={{ base: "none", md: "block" }}
            fontSize="14px"
            pr="12px"
          >
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
