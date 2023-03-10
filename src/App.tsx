import { Routes, Route } from "react-router-dom";
import Navigation from "./audio-player-excerpt/Navigation";
import AudioPlayerBottom from "./audio-player/audioPlayerBottom";
import ExcerptPlayList from "./pages/excerpt-playlist/ExcerptPlayList";
import { Basket, Home, MyPlaylist } from "./pages/Index";

let audio: HTMLAudioElement | any;

function App() {
  return (
    <div className="">
      <AudioPlayerBottom />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="/excerpts/" element={<ExcerptPlayList />} />
      </Routes>
    </div>
  );
}

export default App;
