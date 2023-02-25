import { Box } from "@chakra-ui/react";

interface ITrackList {
  onClick?: any;
  name?: string;
  music?: any;
}

export default function ListForAlbumOrTracks({
  music,
  name,
  onClick,
}: ITrackList) {
  return <Box></Box>;
}
