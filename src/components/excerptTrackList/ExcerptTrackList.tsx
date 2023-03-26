import { Box, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import {
  useAction,
  useActionBasket,
  useExcerpAction,
} from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../playlist/reducer/action-creator";
import { ITrack } from "../../redux/types";
import MusicForList from "../ui/MusicForList";
import { getIdAlums } from "../helper";
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
      h="437px"
      mx="auto"
      display="flex"
      flexDir="column"
      justifyContent="start"
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
  );
}
