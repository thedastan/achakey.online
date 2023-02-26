import { Box, Image } from "@chakra-ui/react";
import { useAppDispatch } from "../../hooks/Index";
import { useAction } from "../../hooks/useActions";
import {
  currentIndexAction,
  eventChange,
} from "../../pages/allPlaylist/reducer/action-creator";
import { ITrack } from "../../redux/types/Track";
import ListForAlbumOrTracks from "../ui/ListForAlbumOrTracks";
import sebelep from "../../assets/img/sebelep.png";
import lilia from "../../assets/img/lilia.png";
import kimBilet from "../../assets/img/kimBilet.png";
import { useState } from "react";

export default function MyAlbum() {
  const listTruck = [
    {
      _id: "1",
      name: "Волчий вой",
      audio:
        "https://muzes.net/uploads/music/2022/10/Ulukmanapo_Volchij_voj.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "2",
      name: "la liga",
      audio: "https://dl2.mp3party.net/online/10068051.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "3",
      name: "Герой",
      audio:
        "https://uztop.net/uploads/music/2023/02/FREEMAN_996_Geroj_OST_RAZBOI.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "10",
      name: "Ойлорумда",
      audio:
        "https://mp3fly.net/uploads/files/mp3/02-2021/1613108060_Bakr_-_Oylorumda.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "5",
      name: "Силуэт",
      audio: require("../../assets/audio/bakr-tvoj-siluet-igraet-na-glazah.mp3"),
      excerpt: "00:30",
      price: "90c",
    },
  ];

  const imges = [
    {
      image: sebelep,
    },
    {
      image: lilia,
    },
    {
      image: kimBilet,
    },
  ];

  const { activeTrack } = useAction();
  const dispatch = useAppDispatch();

  const OnChange = (data: ITrack, index: number) => {
    activeTrack(data);
    eventChange(true);
    dispatch(currentIndexAction(index));
  };

  return (
    <Box minH="90vh">
      <Box display="flex">
        {imges.map((item, index) => (
          <Image
            src={item.image}
            key={index}
            w={{ base: "120px", md: "191px" }}
            h={{ base: "100px", md: "160px" }}
            mr="25px"
            mb="47px"
          />
        ))}
      </Box>
      {listTruck.map((item, index) => (
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
