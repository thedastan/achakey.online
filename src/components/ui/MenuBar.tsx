import { Box, Tooltip } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SvgAllTracks from "../../assets/svg/SvgAllTracks";
import SvgBasket from "../../assets/svg/SvgBasket";
import SvgHome from "../../assets/svg/SvgHome";
import SvgTrack from "../../assets/svg/SvgTrack";
import { useAppSelector } from "../../hooks/Index";
import { useAction, useExcerpAction } from "../../hooks/useActions";
import "./style.css";

interface IPropsMenuBar {
  children?: any;
}

export default function MenuBar({ children }: IPropsMenuBar) {
  const naivigate = useNavigate();
  const { active } = useAppSelector((state) => state.playReducer);

  const list = [
    {
      item: "Главная",
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
      item: "Все треки",
      svg: (
        <SvgAllTracks
          fill={
            window.location.pathname === "/excerpts"
              ? "white"
              : "rgba(255, 255, 255, 0.4)"
          }
        />
      ),
      link: "/excerpts",
    },
    {
      item: "Моя музыка",
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
      item: "Корзина",
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
            <Box key={index} py="17.5px" pl="30px" pr="41px" display="flex">
              <Link to={el.link} className="hover-text">
                {el.svg}
                <span className="tooltip-text" id="right">
                  {el.item}
                </span>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
      <Box display={{ base: "block", md: "none" }} zIndex="2">
        <Box
          position="fixed"
          bottom={active ? "60px" : "21px"}
          left="0"
          right="0"
          display="flex"
          justifyContent="center"
          zIndex="2"
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
              <Box key={index} textColor="white">
                <Link to={el.link} title={el.item}>
                  {el.svg}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        w={{ base: "100%", md: "92%", xl: "95%" }}
        ml="auto"
        minH="90vh"
        bg="#1D1D20"
      >
        {children}
      </Box>
    </Box>
  );
}
