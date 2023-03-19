import { Box, Image } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import Slider from "react-slick";

import { useAction, useTracksAction } from "../../hooks/useActions";
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

export default function MyAlbum() {
  const [indexTab, setIndexTab] = useState<number>(0);
  const [album, setAlbum] = useState<ITrack[] | null>();
  const { activeTrack } = useAction();
  const { fetchMyAlbums } = useTracksAction();
  const dispatch = useAppDispatch();
  const { myAlbums } = useAppSelector((state) => state.musicReducer);

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
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

  useEffect(() => {
    if (myAlbums) {
      setAlbum(myAlbums[indexTab]?.music || null);
    }
  }, [myAlbums, indexTab]);

  console.log(myAlbums);

  return (
    <Box minH="90vh">
      <Box mb="47px" w="100%">
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
      <Box>
        {/* {myAlbums[indexTab]?.map((item, index) => (
          <ListForAlbumOrTracks
            music={item}
            key={index}
            index={index + 1}
            name={item.name}
            onClick={() => OnChange(item, index)}
          />
        ))} */}
      </Box>
    </Box>
  );
}
