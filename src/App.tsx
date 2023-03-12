import { Routes, Route } from "react-router-dom";
import Navigation from "./global-audio-player-excerpt/AudioPlayerExcerpt";
import AudioPlayerBottom from "./global-audio-player/audioPlayerBottom";
import NotFound from "./components/404/NotFound";
import DetailsAlbums from "./pages/details-albums/DetailsAlbums";
import ExcerptPlayList from "./pages/excerpt-playlist/ExcerptPlayList";
import {
  AccountManagamentPage,
  Basket,
  Home,
  MyPlaylist,
  ResetPassword,
} from "./pages/Index";

function App() {
  return (
    <div className="">
      <AudioPlayerBottom />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/excerpts" element={<ExcerptPlayList />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="/excerpts/details/:id" element={<DetailsAlbums />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/accountManagement" element={<AccountManagamentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
