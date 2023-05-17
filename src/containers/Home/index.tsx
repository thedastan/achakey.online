import React, { useEffect, useState } from "react";
import { Box, Text, Button, useBreakpointValue, Stack } from "@chakra-ui/react";
import Music from "./Music";
import "./style.css";
import down from "../../assets/svg/down.svg";
import { useActionBasket, useActionMusicModal } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/Index";

const Home = () => {
  const { ActionMusicModal } = useActionMusicModal();

  const { fetchBasket } = useActionBasket();
  const { modal } = useAppSelector((state) => state.reducerMusicModal);
  const [musicPlay, setMusicPlay] = useState<boolean>(false);
  const breakpoints = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  useEffect(() => {
    fetchBasket();
  }, []);
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
          letterSpacing="0.01em"
          style={{
            transform: modal ? " translateY(-1500%)" : "translateY(100%)",
            transition: modal ? "2s" : "2s",
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
            transform: modal ? " translateY(-1400%)" : "translateY(65%)",
            transition: modal ? "2s" : "2s",
          }}
        >
          Ограниченный выпуск
          <br />
          Эксклюзивные треки
          <br />
          Новые альбомы
        </Text>
          <Button
            className="btn"
            colorScheme="transparent"
            variant="outline"
            color="white"
            fontSize="15px"
            mt="25px"
            height="42px"
            zIndex={{base:"",sm:"9"}}
            px={{base:"33px",md:"63px"}}
            onClick={() => ActionMusicModal(true)}
            style={{
              transform: modal ? " translateY(-1300%)" : "translateY(100%)",
              transition: modal ? "2s" : "2s",
            }}
            rightIcon={<img src={down} alt="img" className="em" />}
          >
            Перейти к трекам<em></em>
          </Button>
        <Music />
      </Box>
    </Box>
  );
};

export default Home;
