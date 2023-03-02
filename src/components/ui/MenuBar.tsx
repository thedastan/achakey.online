import { Box } from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SvgAllTracks from "../../assets/svg/SvgAllTracks";
import SvgBasket from "../../assets/svg/SvgBasket";
import SvgHome from "../../assets/svg/SvgHome";
import SvgTrack from "../../assets/svg/SvgTrack";

interface IPropsMenuBar {
  children?: any;
}

export default function MenuBar({ children }: IPropsMenuBar) {
  const naivigate = useNavigate();

  const list = [
    {
      item: "",
      svg: (
        <SvgHome
          fill={
            window.location.pathname === "/"
              ? "white"
              : "rgba(255, 255, 255, 0.4)"
          }
        />
      ),
      link: "/",
    },
    {
      item: "",
      svg: (
        <SvgAllTracks
          fill={
            window.location.pathname === "/all-playlist"
              ? "white"
              : "rgba(255, 255, 255, 0.4)"
          }
        />
      ),
      link: "/all-playlist",
    },
    {
      item: "",
      svg: (
        <SvgTrack
          fill={
            window.location.pathname === "/my-playlist"
              ? "white"
              : "rgba(255, 255, 255, 0.4)"
          }
        />
      ),
      link: "/my-playlist",
    },
    {
      item: "",
      svg: (
        <SvgBasket
          fill={
            window.location.pathname === "/basket"
              ? "white"
              : "rgba(255, 255, 255, 0.4)"
          }
        />
      ),
      link: "/basket",
    },
  ];

  return (
    <Box maxW="1660px" mx="auto">
      <Box
        position="fixed"
        left="0"
        top="0"
        bottom="0"
        bg="#0B0B0B"
        zIndex="2"
        display={{ base: "none", md: "block" }}
      >
        <Box py="46px">
          {list.map((el, index) => (
            <Box key={index} py="17.5px" pl="30px" pr="41px">
              <Link to={el.link}>{el.svg}</Link>
            </Box>
          ))}
        </Box>
      </Box>
      <Box display={{ base: "block", md: "none" }} zIndex="2">
        <Box
          position="fixed"
          bottom="21px"
          left="0"
          right="0"
          display="flex"
          justifyContent="center"
        >
          <Box
            py="15px"
            rounded="59px"
            w="90vw"
            display="flex"
            justifyContent="space-between"
            bg="#0B0B0B"
            px="46px"
          >
            {list.map((el, index) => (
              <Box key={index}>
                <Link to={el.link}>{el.svg}</Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        w={{ base: "100%", md: "92%", xl: "95%" }}
        ml="auto"
        // pb="50px"
        bg="#1B1B1B"
      >
        {children}
      </Box>
    </Box>
  );
}
