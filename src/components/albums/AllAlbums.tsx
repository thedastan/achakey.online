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

  return (
    <section style={{ minHeight: "70vh" }}>
      <Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={{ base: "space-between", sm: "start" }}
        >
          {albums.map((el, index) => (
            <Box
              key={index}
              w={{ base: "169px", md: "259px" }}
              mr={albums.length - 1 === index ? "0" : { base: "0", md: "43px" }}
              mx={{ base: "auto", sm: "10px" }}
              objectFit="cover"
              h={{ base: "141px", md: "217px" }}
              mb="45px"
              pos="relative"
            >
              <NavLink to={`details/${el.id}`}>
                <Image
                  src={el?.image}
                  w="100%"
                  h={{ base: "141px", md: "217px" }}
                  rounded={{ base: "9px", md: "14px" }}
                />
                <Box
                  position="absolute"
                  bg="linear-gradient(180deg, rgba(0, 0, 0, 0) -1.97%, #000000 92.45%)"
                  zIndex="3"
                  bottom="0"
                  left="0"
                  right="0"
                  roundedBottom={{ base: "9px", md: "14px" }}
                  display="flex"
                  flexDir="column"
                  justifyContent="end"
                  h="100%"
                  _hover={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) -1.97%, #000000 100.45%)",
                    transition: "1s",
                  }}
                >
                  <Text
                    w="80%"
                    textColor="white"
                    fontWeight="500"
                    fontSize={{ base: "16px", md: "22px" }}
                    pl={{ base: "16px", md: "24px" }}
                    pt="27px"
                    noOfLines={1}
                  >
                    {el.name}
                  </Text>
                  <Text
                    pl={{ base: "16px", md: "24px" }}
                    color="white"
                    opacity="0.5"
                    fontSize={{ base: "12px", md: "16px" }}
                    pb={{ base: "10px", md: "19px" }}
                  >
                    {`${el.music.length}`} треков
                  </Text>
                </Box>
              </NavLink>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
}
