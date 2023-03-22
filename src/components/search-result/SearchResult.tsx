import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/Index";

export default function SearchResult() {
  // const {} = useAppSelector((state))
  const { id } = useParams();

  return (
    <Box>
      <Box></Box>
    </Box>
  );
}
