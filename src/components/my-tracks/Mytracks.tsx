import { Box, Image, Text } from "@chakra-ui/react";
import { Key, useEffect, useState } from "react";
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
import { IMyTrack, ITrack } from "../../redux/types";
import ListForAlbumOrTracks from "../ui/ListForAlbumOrTracks";
import PopupForLyrics from "../ui/popupForLyrics";

export default function MyTracks() {
  const dispatch = useAppDispatch();
  const { fetchMyTracks } = useTracksAction();
  const { activeTrack } = useAction();
  const { excerptPauseAction } = useExcerpAction();

  const [openPopup, setOpenPopup] = useState(false);

  const { myTracks } = useAppSelector((state) => state.musicReducer);
  const { active } = useAppSelector((state) => state.playReducer);

  const activeText = myTracks.some((el) => el.id === active?.id);

  const OnChange = (data: ITrack, index: number) => {
    if (data.id !== active?.id) {
      activeTrack(data);
      eventChange(true);
      dispatch(currentIndexAction(index));
    }
    excerptPauseAction();
    setOpenPopup(true);
  };

  useEffect(() => {
    fetchMyTracks();
  }, []);

  return (
    <Box minH="90vh" display="flex" justifyContent="space-between">
      <Box w={activeText ? { base: "100%", lg: "70%" } : "100%"}>
        {myTracks?.map((item: IMyTrack, index: Key | any) => (
          <ListForAlbumOrTracks
            music={item}
            key={index}
            index={index + 1}
            name={item.name}
            onClick={() => OnChange(item, index)}
          />
        ))}
      </Box>
      {activeText && (
        <Box
          textColor="white"
          maxW="350px"
          px="35px"
          py="35px"
          rounded="30px"
          bg="rgba(255, 255, 255, 0.08)"
          ml="20px"
          display={{ base: "none", lg: "block" }}
          mb="18px"
        >
          <Box pb="18px">
            <Image
              maxW="279px"
              minH="279px"
              rounded="22px"
              objectFit="cover"
              src={active?.image}
            />
          </Box>
          <Text fontSize="14px" lineHeight="19.88px">
            <p>
              {active?.text?.split("\r\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </p>
          </Text>
        </Box>
      )}
      <PopupForLyrics
        className={openPopup ? "transform" : ""}
        image={active?.image}
        setOpenPopup={setOpenPopup}
        text={active?.text}
      />
    </Box>
  );
}
