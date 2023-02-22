import { Container } from "@chakra-ui/react";
import { useState } from "react";

import AudioPlayer from "../../components/audio-player/AudioPlayer";
import TrackList from "../../components/trackList/TrackList";

export default function AllPlaylist() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [eventChange, setEventChange] = useState(false);

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
      artist: "freeman 996",
      text: "03:07",
    },
    {
      _id: "4",
      name: "Албетте",
      audio: require("../../assets/audio/freeman996-albette.mp3"),
      artist: "freeman 996",
      text: "03:07",
    },
    {
      _id: "5",
      name: "Ойлорумда",
      audio:
        "https://mp3fly.net/uploads/files/mp3/02-2021/1613108060_Bakr_-_Oylorumda.mp3",
      artist: "freeman 996",
      text: "03:07",
    },
  ];

  console.log(currentIndex, "DOM");

  return (
    <section style={{ background: "#242424" }}>
      <Container maxW="1220px">
        <AudioPlayer
          setEventChange={setEventChange}
          eventChange={eventChange}
          listTruck={listTruck}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <TrackList
          tracks={listTruck}
          setCurrentIndex={setCurrentIndex}
          setEventChange={setEventChange}
        />
      </Container>
    </section>
  );
}
