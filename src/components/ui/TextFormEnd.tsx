import { Box, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";

type ITextFormEnd = {
  questionText: string;
  textWord: string;
  onClickLink: () => void;
};

const TextFormEnd: FC<ITextFormEnd> = ({
  questionText,
  textWord,
  onClickLink,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={{ base: "column", sm: "row" }}
      my="10px"
      fontFamily="sans"
      fontWeight="400"
      fontSize="14px"
    >
      <Text color="#353535" pr="5px">
        {questionText}
      </Text>
      <Link color="rgba(59,113,254,1)" onClick={onClickLink}>
        {textWord}
      </Link>
    </Box>
  );
};

export default TextFormEnd;
