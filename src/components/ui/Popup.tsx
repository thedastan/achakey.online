import { Box } from "@chakra-ui/react";

interface IPopup {
  children: JSX.Element;
  top: string;
}

export default function Popup({ children, top }: IPopup) {
  return (
    <Box
      position="absolute"
      top={top}
      left="0"
      right="0"
      maxW="540px"
      mx="auto"
      roundedBottom="5px"
      px={{ base: "20px", sm: "10px", md: "0" }}
      zIndex="2"
    >
      <Box bg="white" roundedBottom="5px">
        {children}
      </Box>
    </Box>
  );
}
