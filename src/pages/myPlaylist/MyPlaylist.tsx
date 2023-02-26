import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import MyTracks from "../../components/myTracks/MyTracks";
import BottomPlayer from "../../components/ui/BottomPLayer";
import JaxImage from "../../assets/img/Jax.png";
import MyAlbum from "../../components/MyAlbum/MyAlbum";

enum AlbumOrTracks {
  ALBUM = "ALBUM",
  TRACKS = "TRACKS",
}

export default function MyPlaylist() {
  let activeStyle = {
    color: "white",
    cursor: "pointer",
  };

  const [isActive, setActive] = useState(AlbumOrTracks.TRACKS);
  const isAlbum = isActive === AlbumOrTracks.ALBUM;
  const isTracks = isActive === AlbumOrTracks.TRACKS;

  return (
    <section>
      <Container maxW="1220px">
        <Box pt="150px" pl={{ base: "60px", md: "50px", xl: "5%" }}>
          <Box display="flex" mb="31px" zIndex="0">
            <Text
              cursor="pointer"
              fontWeight="600"
              color={isTracks ? "white" : "rgba(255, 255, 255, 0.4)"}
              mr="69px"
              fontSize="24px"
              onClick={() => setActive(AlbumOrTracks.TRACKS)}
            >
              Моя музыка
            </Text>
            <Text
              cursor="pointer"
              fontWeight="600"
              color={isAlbum ? "white" : "rgba(255, 255, 255, 0.4)"}
              fontSize="24px"
              onClick={() => setActive(AlbumOrTracks.ALBUM)}
            >
              Моя альбом
            </Text>
          </Box>
          <Box display="flex">
            <Box
              w={{ base: "90vw", lg: "699px" }}
              h="auto"
              mx={{ base: "auto", lg: "none" }}
            >
              {isTracks ? <MyTracks /> : <MyAlbum />}
            </Box>
            <Box w="279px" ml="auto" display={{ base: "none", lg: "block" }}>
              <Image src={JaxImage} w="100%" mb="18px" />

              <Box overflowY="auto" maxH="400px">
                <Text>
                  Менин ойлорумда сенин атың чөгуп калды Жана жүрөгүмдө, о-уо-о
                  Менин жүрөгүмдөн абдан жылуу оорун алдың Жана көкурөгумдөн,
                  йе-е-е Менин ойлорумда сенин атың чөгуп калды Жана жүрөгүмдө,
                  о-уо-о Менин жүрөгүмдөн абдан жылуу оорун алдың Жана
                  көкурөгумдөн, йе-е-е До нашего знакомства я был бессердечным
                  Встретив её, сразу я потерял дар речи Нежный голос шепчет,
                  обнимая плечи Я думал, что навечно, а ты считала встречи Запах
                  твоих локон меня торкал до манна Секунду за секундой
                  становился наркоманом Не смог стопанутся, ты стала марихуаной
                  Для меня и даришь туманы, растаману Ты — мой воздух и я дышу
                  тобой Ты — моя муза кислая, моя любовь и боль Пусть накроет
                  волной холодной зимой Ты будь рядом со мной, моя любовь Мою
                  любовь к тебе никогда не потушить Она горит внутри и она хочет
                  жить Я знаю что отпускаю тебя навсегда Мне бы главное чтоб ты
                  была счастлива Менин ойлорумда сенин атың чөгуп калды Жана
                  жүрөгүмдө, о-уо-о Менин жүрөгүмдөн абдан жылуу оорун алдың
                  Жана көкурөгумдөн, йе-е-е Менин ойлорумда сенин атың чөгуп
                  калды Жана жүрөгүмдө, о-уо-о Менин жүрөгүмдөн абдан жылуу
                  оорун алдың Жана көкурөгумдөн, йе-е-е
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
}
