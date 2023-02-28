import { Box } from "@chakra-ui/react";

interface IPopup {
  children: JSX.Element;
  //   active: boolean;
  //   setActive: (value: boolean) => void;
}

export default function Popup({ children }: IPopup) {
  //   const closePopup = () => {
  //     setActive(!active);
  //   };

  return (
    <Box
      position="absolute"
      top="70px"
      left="0"
      right="0"
      maxW="540px"
      mx="auto"
      roundedBottom="5px"
      bg="white"
    >
      <Box>{children}</Box>
    </Box>
  );
}
