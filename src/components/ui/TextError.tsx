import { Text } from "@chakra-ui/react";
import React, { FC } from "react";

type ITextError = {
  text: string | any;
};

const TextError: FC<ITextError> = ({ text }) => {
  return (
    <Text color="redForm" fontSize="12px" ml={{ base: "5px", sm: "14px" }}>
      {text}
    </Text>
  );
};

export default TextError;
