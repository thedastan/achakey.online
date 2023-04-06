import { Box, Text } from "@chakra-ui/react";
import React from "react";

import "./style.scss";
import { useAppSelector } from "../../hooks/Index";
import { useActionToastMessage } from "../../hooks/useActions";

const ToastMessage = () => {
  const { toast } = useAppSelector((state) => state.reducerToasrMessage);

  const { toastMessageClose } = useActionToastMessage();

  const onClickClose = () => {
    toastMessageClose();
  };

  if (toast.setOut) {
    setTimeout(() => {
      onClickClose();
    }, 8000);
  }

  return (
    <Box overflow="hidden">
      <Box
        w={{ base: "270px", sm: "380px" }}
        borderRadius="10px"
        position="fixed"
        top="5px"
        right="5px"
        bg="#FFFFFF"
        zIndex="22"
        py="5px"
        pl="15px"
        pr="10px"
        className={toast.setOut ? "toast__block" : "toast__none"}
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
            color={toast.status ? "#3BBF39" : "redForm"}
            pt="5px"
          >
            {toast.status ? "Успешно" : "Ошибка"}
          </Text>
          <Text
            p="2px"
            cursor="pointer"
            fontWeight="500"
            fontSize="20px"
            onClick={onClickClose}
          >
            ⨉
          </Text>
        </Box>
        <Text mb="5px" fontSize={{ base: "14px", sm: "16px" }} color="#000000">
          {toast.message}
        </Text>
      </Box>
    </Box>
  );
};

export default ToastMessage;
