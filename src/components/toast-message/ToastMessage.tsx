import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ToastMessage = () => {
  return (
    <Box
      w={{ base: "270px", sm: "380px" }}
      borderRadius="10px"
      position="absolute"
      top="85px"
      right={{ base: "1rem", sm: "2rem" }}
      bg="#FFFFFF"
      zIndex="20"
      py="5px"
      pl="15px"
      pr="10px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontFamily="sans"
      >
        <Text
          fontWeight="500"
          fontSize={{ base: "16px", sm: "20px" }}
          color="#3BBF39"
          pt="5px"
        >
          Успешно
        </Text>
        <Text p="2px" cursor="pointer" fontWeight="500" fontSize="20px">
          ⨉
        </Text>
      </Box>
      <Text mb="5px" fontSize={{ base: "14px", sm: "16px" }} color="#000000">
        Пароль успешно изменен
      </Text>
    </Box>
  );
};

export default ToastMessage;
