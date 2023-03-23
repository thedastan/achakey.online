import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function SearchResult() {
  //   const {} = useAppSelector((state))
  const { id } = useParams();

  return (
    <Box>
      <Box></Box>
    </Box>
  );
}