import { useEffect } from "react";

import ExcerptTrackList from "../excerptTrackList/ExcerptTrackList";
import { useAppSelector } from "../../hooks/Index";
import { useTracksAction } from "../../hooks/useActions";

export default function AllPlaylist() {
  const { fetchTracks } = useTracksAction();
  const { tracks } = useAppSelector((state) => state.musicReducer);

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <section style={{ minHeight: "70vh" }}>
      <ExcerptTrackList tracks={tracks} allTracks />
    </section>
  );
}
