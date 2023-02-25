import { Container } from "@chakra-ui/react";
import { useState } from "react";

import AudioPlayer from "../../components/audio-player/AudioPlayer";
import TrackList from "../../components/trackList/TrackList";

export default function AllPlaylist() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const listTruck = [
    {
      _id: "1",
      name: "Волчий вой",
      audio:
        "https://muzes.net/uploads/music/2022/10/Ulukmanapo_Volchij_voj.mp3",
      artist: "Ulukmanapo",
      text: "03:11",
    },
    {
      _id: "2",
      name: "la liga",
      audio: "https://dl2.mp3party.net/online/10068051.mp3",
      artist: "Ulukmanapo",
      text: "03:11",
    },
    {
      _id: "3",
      name: "Герой",
      audio:
        "https://uztop.net/uploads/music/2023/02/FREEMAN_996_Geroj_OST_RAZBOI.mp3",
      artist: "Freeman 996",
    },
    {
      _id: "10",
      name: "Ойлорумда",
      audio:
        "https://mp3fly.net/uploads/files/mp3/02-2021/1613108060_Bakr_-_Oylorumda.mp3",
      artist: "Bakr",
    },
    {
      _id: "5",
      name: "Силуэт",
      audio: require("../../assets/audio/bakr-tvoj-siluet-igraet-na-glazah.mp3"),
      artist: "Bakr",
    },
  ];


  return (
    <section style={{ background: "#242424" }}>
      <Container maxW="1220px">
        <AudioPlayer
          listTruck={listTruck}
        />
        <TrackList
          tracks={listTruck}
        />
      </Container>
    </section>
  );
}
