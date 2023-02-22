import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
      mt="1px"
    >
      <Box display="flex" alignItems="center" w="200px">
        {active?._id === music._id ? (
          <Box
            cursor="pointer"
            display="inline-block"
            w="32px"
            h="32px"
            pt="2px"
          >
            {pause ? <SvgPlayerGifDefault /> : <SvgPlayerGif />}
          </Box>
        ) : (
          <Box cursor="pointer" display="inline-block" w="32px">
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
      <Text color="white" cursor="pointer">
        {music.artist}
      </Text>
      <Text color="white" w="160px">
        {music.text}
      </Text>
      <Button
        border="1px"
        borderColor={active?._id === music._id ? "green" : "white"}
        rounded="0px"
        fontSize="9px"
        h="23px"
        w="84px"
        textColor={active?._id === music._id ? "green" : "white"}
        background="transparent"
        colorScheme="none"
      >
        + в корзину
      </Button>
    </Box>
  );
}
