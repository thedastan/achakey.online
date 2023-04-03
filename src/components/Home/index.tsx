import React, { useState } from "react";
import { Box, Text, Button, Stack, useBreakpointValue } from "@chakra-ui/react";
import Music from "./Music";
import "./style.css";
import down from "../../assets/svg/down.svg"

const Home = () => {
  const [musicPlay, setMusicPlay] = useState<boolean>(false);
  const breakpoints = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  return (
    <Box maxW="3072px" className="home-bg">
      <Box
        pt={{ base: "50px", sm: "70px", md: "150px" }}
        pl={{ base: "20px", sm: "60px", md: "100px" }}
      >
        <Text
          maxW="468px"
          fontFamily="Krona One, sans-serif"
          fontStyle="normal"
          fontWeight="400"
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          color="white"
          zIndex="2"
          letterSpacing="0.01em"
          style={{
            transform: musicPlay ? " translateY(-1500%)" : "translateY(100%)",
            transition: musicPlay ? "2s" : "2s",
          }}
        >
          JAX 02.14
        </Text>
        <Text
          fontFamily="Montserrat, sans-serif"
          fontStyle="normal"
          color="#FFFFFF"
          letterSpacing="0.1em"
          fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
          my={{ base: "40px", sm: "50px", md: "50px" }}
          px="25px"
          borderLeft="3px solid #49DEFF"
          style={{
            transform: musicPlay ? " translateY(-1400%)" : "translateY(65%)",
            transition: musicPlay ? "2s" : "2s",
          }}
        >
          Ограниченный выпуск
          <br />
          Эксклюзивные треки
          <br />
          Новые альбомы
        </Text>
        <Stack direction="row" spacing={4} align="center">
          <Button
            className="btn"
            colorScheme="transparent"
            variant="outline"
            color="white"
            fontSize="15px"
            mt="25px"
            height="42px"
            px={breakpoints === "base" && "sm" ? "33px" : "63px"}
            onClick={() => setMusicPlay(true)}
            style={{
              transform: musicPlay ? " translateY(-1300%)" : "translateY(100%)",
              transition: musicPlay ? "2s" : "2s",
            }}
            rightIcon={<img src={down} alt="img" className="em" />}
          >
            Перейти к трекам<em></em>
          </Button>
        </Stack>
        <Music musicPlay={musicPlay} />
      </Box>
    </Box>
  );
};

export default Home;
