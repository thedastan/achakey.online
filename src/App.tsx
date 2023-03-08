import { Routes, Route } from "react-router-dom";
import Navigation from "./audio-player-excerpt/AudioPlayerExcerpt";
import AudioPlayerBottom from "./audio-player/audioPlayerBottom";
import DetailsAlbums from "./pages/details-albums/DetailsAlbums";
import ExcerptPlayList from "./pages/excerpt-playlist/ExcerptPlayList";
import { Basket, Home, MyPlaylist } from "./pages/Index";

let audio: HTMLAudioElement | any;

function App() {
  return (
    <div className="">
      <AudioPlayerBottom />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="/excerpts/" element={<ExcerptPlayList />} />
        <Route path="/excerpts/details/:id" element={<DetailsAlbums />} />
      </Routes>
    </div>
  );
}

export default App;
