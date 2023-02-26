import { Box } from "@chakra-ui/react";
import SvgAllTracks from "../../assets/svg/SvgAllTracks";
import SvgBasket from "../../assets/svg/SvgBasket";
import SvgHome from "../../assets/svg/SvgHome";
import SvgTrack from "../../assets/svg/SvgTrack";

interface IPropsMenuBar {
  children?: any;
}

export default function MenuBar({ children }: IPropsMenuBar) {
  const list = [
    {
      item: "",
      svg: <SvgHome />,
      link: "/",
    },
    {
      item: "",
      svg: <SvgAllTracks />,
      link: "/",
    },
    {
      item: "",
      svg: <SvgTrack />,
      link: "/",
    },
    {
      item: "",
      svg: <SvgBasket />,
      link: "/",
    },
  ];

  return (
    <Box maxW="1660px" mx="auto">
      <Box position="fixed" left="0" top="0" bottom="0" bg="#0B0B0B" zIndex="2">
        <Box py="46px">
          {list.map((el, index) => (
            <Box key={index} py="17.5px" pl="30px" pr="41px">
              {el.svg}
            </Box>
          ))}
        </Box>
      </Box>
      <Box w={{ base: "100%", md: "95%" }} ml="auto" pb="50px" bg="#1B1B1B">
        {children}
      </Box>
    </Box>
  );
}
