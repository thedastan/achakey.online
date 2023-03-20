import { Box, Image, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import Slider from "react-slick";

import {
  useAction,
  useExcerpAction,
  useTracksAction,
} from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../playlist/reducer/action-creator";
import ListForAlbumOrTracks from "../ui/ListForAlbumOrTracks";
import { SampleNextArrow } from "../ui/SampleNextArrow";
import { SamplePrevArrow } from "../ui/SamplePrevArrow";
import "./style.css";
import { useEffect, useState } from "react";
import { ITrack } from "../../redux/types";
import { indexForAlbums } from "./action-creators";
import PopupForLyrics from "../ui/popupForLyrics";

export default function MyAlbum() {
  const [openPopup, setOpenPopup] = useState(false);
  const [indexTab, setIndexTab] = useState<number>(0);
  const { activeTrack } = useAction();
  const { fetchMyAlbums } = useTracksAction();
  const dispatch = useAppDispatch();
  const { myAlbums } = useAppSelector((state) => state.musicReducer);
  const { active } = useAppSelector((state) => state.playReducer);

  const { excerptPauseAction } = useExcerpAction();

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
    excerptPauseAction();
  };

  const onChangeIndex = (index: number) => {
    dispatch(indexForAlbums(index));
    setIndexTab(index);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: myAlbums.length <= 2 ? 2 : 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  useEffect(() => {
    fetchMyAlbums();
  }, []);

  return (
    <Box minH="90vh">
      <Box mb="47px" w={{ base: "100%", md: "90%" }}>
        <Slider {...settings}>
          {myAlbums?.map((el, index) => (
            <Box key={index} onClick={() => onChangeIndex(index)}>
              <Image
                src={el.image}
                maxW={{ base: "109px", md: "160px", lg: "210px" }}
                h={{ base: "91px", md: "130px", lg: "170px" }}
                rounded="12px"
                objectFit="cover"
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Box w="100%">
        {myAlbums[indexTab]?.music?.map((item, index) => (
          <ListForAlbumOrTracks
            music={item}
            key={index}
            index={index + 1}
            name={item.name}
            onClick={() => OnChange(item, index)}
          />
        ))}
      </Box>
      {active && (
        <Box
          textColor="white"
          maxW="350px"
          px="35px"
          py="35px"
          rounded="30px"
          bg="rgba(255, 255, 255, 0.08)"
          ml="20px"
          display={{ base: "none", lg: "block" }}
        >
          <Box pb="18px">
            <Image maxW="279px" rounded="22px" src={active?.image} />
          </Box>
          <Text fontSize="14px" lineHeight="19.88px">
            <p>
              {active.text?.split("\r\n").map((line, index) => (
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
