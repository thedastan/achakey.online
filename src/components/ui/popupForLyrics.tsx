import { Box, Image, Text } from "@chakra-ui/react";
import SvgArrowTop from "../../assets/svg/SvgArrowTop";

interface IPopup {
  image?: string;
  text?: string;
  setOpenPopup: (value: boolean) => void;
  className?: string;
}

export default function PopupForLyrics({
  image,
  text,
  setOpenPopup,
  className,
}: IPopup) {
  return (
    <Box
      className={`lyrics ${className}`}
      textColor="white"
      px="35px"
      py="100px"
      rounded="30px"
      bg="#1D1D20"
      left="0"
      right="0"
      top="0"
      bottom="0"
      pos="fixed"
      pl={{ base: "35px", md: "15%" }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        onClick={() => setOpenPopup(false)}
      >
        <Text>Закрыть</Text>
        <Box className="accordion__icon" ml="17px">
          <SvgArrowTop stroke="white" />
        </Box>
      </Box>
      <Box h="90vh" overflowY="auto" pb="50%" pt="20px">
        <Box
          px={{ base: "15px", sm: "35px" }}
          py={{ base: "15px", sm: "35px" }}
          rounded="30px"
          bg="rgba(255, 255, 255, 0.08)"
        >
          <Image rounded={{ base: "22px", sm: "22px" }} src={image} />
        </Box>
        <Text fontSize="14px" lineHeight="19.88px" pt="30px" pb="100px">
          <p>
            {text?.split("\r\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </p>
        </Text>
      </Box>
    </Box>
  );
}
