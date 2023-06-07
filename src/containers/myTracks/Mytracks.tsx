import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { useAction, useTracksAction } from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../excerptPlaylist/reducer/action-creator";
import ListForAlbumOrTracks from "../../components/ui/ListForAlbumOrTracks";
import PopupForLyrics from "../../components/ui/popupForLyrics";
import { IMyTrack, ITrack } from "../../redux/types";
import SvgLink from "../../assets/svg/SvgLink";

export default function MyTracks() {
  const dispatch = useAppDispatch();
  const { fetchMyTracks } = useTracksAction();
  const { activeTrack } = useAction();

  const [openPopup, setOpenPopup] = useState(false);

  const { myTracks } = useAppSelector((state) => state.musicReducer);
  const { active } = useAppSelector((state) => state.playReducer);
  const { loading } = useAppSelector(
    (state) => state.reducerChangeTimePlayerBottom
  );

  const activeText = myTracks.some((el) => el.id === active?.id);

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  useEffect(() => {
    fetchMyTracks();
  }, []);

  return (
    <Box minH="90vh" display="flex" justifyContent="space-between">
      {loading && (
        <Box
          pos="fixed"
          top="0"
          bottom="0"
          left="0"
          right="0"
          bg="rgba(11, 11, 11, 0.49)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="10"
        >
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner mb="10px" color="#49DEFF" />
            <Text textColor="white">
              Пожалуйста подождите идет конвертация музыки...
            </Text>
          </Box>
        </Box>
      )}
      <Box w={activeText ? { base: "100%", lg: "70%" } : "100%"} pt="46px">
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
          mt="-30px"
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
          <Box
            mt="14px"
            bg="rgba(255, 255, 255, 0.08)"
            rounded="12px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py="12px"
            px="14px"
            fontFamily="montsserat"
            fontSize="14px"
            lineHeight="20px"
          >
            <Text>Посмотреть клип</Text>
            <SvgLink />
          </Box>
          <Text fontSize="14px" lineHeight="19.88px" mt="12px">
            <span>
              {active?.text
                ?.split("\r\n")
                .map(
                  (
                    line:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined,
                    index: Key | null | undefined
                  ) => (
                    <span key={index}>{line}</span>
                  )
                )}
            </span>
          </Text>
        </Box>
      )}
      <PopupForLyrics
        className={openPopup ? "transform" : ""}
        image={active?.image}
        setOpenPopup={setOpenPopup}
        text={active?.text}
        onClose={handleClose}
      />
    </Box>
  );
}
