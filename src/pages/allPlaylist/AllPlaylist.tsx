import { Container } from "@chakra-ui/react";

import AudioPlayer from "../../components/audio-player/AudioPlayer";
import TrackList from "../../components/trackList/TrackList";

export default function AllPlaylist() {
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

  return (
    <section style={{ minHeight: "70vh" }}>
      <Container maxW="1220px">
        <AudioPlayer listTruck={listTruck} />
        <TrackList tracks={listTruck} />
      </Container>
    </section>
  );
}
