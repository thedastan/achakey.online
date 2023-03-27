import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

import SvgEyeInput from "../../assets/svg/SvgEye";

type IEyeInput = {
  eye: boolean;
  onClickEye: () => void;
};

const EyeInput: FC<IEyeInput> = ({ eye, onClickEye }) => {
  return (
    <Box
      color="#000000"
      h="100%"
      display="flex"
      alignItems="center"
      cursor="pointer"
      fontSize={{ base: "20px", sm: "25px" }}
      onClick={onClickEye}
    >
      <SvgEyeInput eye={eye} />
    </Box>
  );
};

export default EyeInput;
