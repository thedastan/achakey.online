import { Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import AudioPlayer from "../../components/audio-player/AudioPlayer";
import { useAppSelector } from "../../hooks/Index";
import { useAction } from "../../hooks/useActions";
import { ITrack } from "../../redux/types/Track";

let audio: any;
export default function Main() {
  const { activeTrack } = useAction();

  const listTruck = [
    {
      _id: "1",
      name: "Волчий вой",
      audio:
        "https://muzes.net/uploads/music/2022/10/Ulukmanapo_Volchij_voj.mp3",
    },
    {
      _id: "2",
      name: "la liga",
      audio: "https://dl2.mp3party.net/online/10068051.mp3",
    },
    {
      _id: "3",
      name: "Герой",
      audio:
        "https://uztop.net/uploads/music/2023/02/FREEMAN_996_Geroj_OST_RAZBOI.mp3",
    },
  ];

  const OnChange = (data: ITrack) => {
    activeTrack(data);
  };

  return (
    <section>
      <Box>Main</Box>
      <AudioPlayer listTruck={listTruck} />
      {listTruck.map((el, index) => (
        <div key={index}>
          <p
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={() => OnChange(el)}
          >
            #{index + 1}. {el.name}
          </p>
        </div>
      ))}
    </section>
  );
}
