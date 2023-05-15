import { Box, Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/Index";
import {
  useAction,
  useExcerpAction,
  useTracksAction,
} from "../../hooks/useActions";
import { ITrack } from "../../redux/types";
import MusicForList from "../ui/MusicForList";

export default function SearchResult() {
  const { id } = useParams<string>();
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
        <Box mx="auto" pl={{ base: "0", md: "5%", xl: "0" }}>
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
              >
                Все треки
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
          </Box>
          <MusicForList
            name={track.name}
            artist={track.artist}
            music={track}
            onClick={() => OnChange(track)}
          />
        </Box>
      </Container>
    </Box>
  );
}
