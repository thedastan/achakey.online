import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "../../hooks/Index";
import { useTracksAction } from "../../hooks/useActions";

export default function AllAlbums() {
  const { fetchTracks } = useTracksAction();
  const { albums } = useAppSelector((state) => state.musicReducer);

  useEffect(() => {
    fetchTracks();
  }, []);

  console.log();

  return (
    <section style={{ minHeight: "70vh" }}>
      <Box>
        <Box
          maxW="1164px"
          rounded="30px"
          bg="rgba(255, 255, 255, 0.08)"
          minH="241px"
          mb="45px"
        ></Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={{ base: "center", md: "space-between" }}
        >
          {albums.map((el, index) => (
            <Box
              key={index}
              maxW="259px"
              mr={albums.length - 1 === index ? "0" : { base: "0", md: "43px" }}
              mx={{ base: "10px", md: "0" }}
              objectFit="cover"
              h="auto"
              mb="45px"
              pos="relative"
            >
              <Image src={el?.image} h="200px" w="100%" rounded="14px" />
              <Box
                position="absolute"
                bg="linear-gradient(180deg, rgba(0, 0, 0, 0) -1.97%, #000000 92.45%)"
                zIndex="3"
                bottom="0"
                left="0"
                right="0"
                roundedBottom="14px"
                h="93px"
              >
                <NavLink to={`details/${el.id}`}>
                  <Text
                    textColor="white"
                    fontWeight="500"
                    fontSize="22px"
                    pl="24px"
                    pt="27px"
                  >
                    {el.name}
                  </Text>
                  <Text pl="24px" color="white" opacity="0.5">
                    {`${el.music.length}`} треков
                  </Text>
                </NavLink>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
}
