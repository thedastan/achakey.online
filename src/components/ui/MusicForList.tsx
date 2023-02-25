import { Box, Button, Text } from "@chakra-ui/react";
import SvgPlay from "../../assets/svg/SvgPlay";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { useAppSelector } from "../../hooks/Index";

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: any;
}

export default function MusicForList({ onClick, name, music }: ITrackChange) {
  const { active, pause } = useAppSelector((state) => state.playReducer);

  return (
    <Box
      py="22px"
      onClick={() => onClick(music)}
      borderBottom="2px"
      borderColor="#4F4F4F"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      background="transparent"
    >
      <Box display="flex" alignItems="center">
        {active?._id === music._id ? (
          <Box display="inline-block" w="32px" h="32px" pt="2px">
            {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
          </Box>
        ) : (
          <Box display="inline-block" w="32px">
            <SvgPlay fill={active?._id === music._id ? "#0EEB24" : "#FFFFFF"} />
          </Box>
        )}
        <Text
          textColor={active?._id === music._id ? "green" : "white"}
          fontSize="14px"
          ml="17.4px"
          cursor="pointer"
        >
          {name}
        </Text>
      </Box>

      <Button
        border="1px"
        borderColor={active?._id === music._id ? "green" : "white"}
        rounded="0px"
        fontSize="9px"
        h="23px"
        w="84px"
        textColor={active?._id === music._id ? "green" : "white"}
        bg="transparent"
      >
        + в корзину
      </Button>
    </Box>
  );
}
