import { Box, Text } from "@chakra-ui/react";
import React from "react";

const TextAfterRegister = () => {
  return (
    <>
      <Box
        fontSize="16px"
        fontWeight="400"
        color="#1D1D20"
        fontFamily="sans"
        py="10px"
        mb="20px"
      >
        <Text fontSize="20px" fontWeight="600">
          Спасибо за регистрацию на нашем сайте!
        </Text>
        <Text mt="20px">
          Проверьте вашу электронную почту и следуйте инструкциям, чтобы
          подтвердить вашу учетную запись.
        </Text>
      </Box>
    </>
  );
};

export default TextAfterRegister;
