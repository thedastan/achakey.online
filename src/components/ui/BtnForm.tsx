import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

type IBtnForm = {
  btnText: string;
  isLoading?: boolean;
  bg: string;
  color: string;
  width?: string;
  colorSceme?: string;
};
const BtnForm: FC<IBtnForm> = ({
  btnText,
  isLoading,
  bg,
  color,
  width,
  colorSceme,
}) => {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
      bg={bg}
      color={color}
      w={width}
      colorScheme={colorSceme}
      fontSize={{ base: "14px", sm: "18px" }}
      fontWeight="600"
      fontFamily="revert"
      my={{ base: "10px", sm: "15px" }}
      py={{ base: "15px", sm: "25px" }}
      borderRadius="14px"
    >
      {btnText}
    </Button>
  );
};

export default BtnForm;
