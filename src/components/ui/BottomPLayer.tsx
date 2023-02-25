import { Box, Container } from "@chakra-ui/layout";

let audio: HTMLAudioElement | any;

export default function BottomPlayer() {
  return (
    <Box position="fixed" bottom="0" left="0" right="0">
      <Container maxW="1220px">
        <Box>Bottom Music</Box>
      </Container>
    </Box>
  );
}
