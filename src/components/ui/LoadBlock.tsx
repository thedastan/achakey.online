import { Spinner, Box } from "@chakra-ui/react";
import React from "react";

const LoadBlock = () => {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#007AFF"
        size={{ base: "lg", lg: "xl" }}
      />
    </Box>
  );
};

export default LoadBlock;
