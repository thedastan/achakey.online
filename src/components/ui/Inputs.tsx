import { Input } from "@chakra-ui/react";
import React, { FC, ChangeEvent } from "react";

type IInputs = {
  id: string;
  placeholder: string;
  type: string;
  required: boolean;
  borderColor: string;
  focusBorderColor: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Inputs: FC<IInputs> = ({
  id,
  placeholder,
  type,
  required,
  borderColor,
  focusBorderColor,
  onChangeInput,
}) => {
  return (
    <Input
      id={id}
      type={type}
      required={required}
      placeholder={placeholder}
      onChange={onChangeInput}
      border="1px"
      borderColor={borderColor}
      focusBorderColor={focusBorderColor}
      bg="#ffffff"
      borderRadius={{ base: "10px", sm: "15px" }}
      fontSize="14px"
      fontWeight="medium"
      fontFamily="revert"
      py={{ base: "10px", sm: "25px" }}
      color="#174079"
      sx={{
        "&::placeholder": {
          color: "#AAAAAA",
          fontSize: "14px",
          fontWeight: "medium",
        },
      }}
    />
  );
};

export default Inputs;
