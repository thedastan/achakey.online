import { Routes, Route } from "react-router-dom";
import Navigation from "./global-audio-player-excerpt/AudioPlayerExcerpt";
import AudioPlayerBottom from "./global-audio-player/audioPlayerBottom";
import NotFound from "./components/404/NotFound";
import DetailsAlbums from "./pages/details-albums/DetailsAlbums";
import ExcerptPlayList from "./pages/excerpt-playlist/ExcerptPlayList";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";
import PublicOffer from "./components/footer/PublicOffer";
import {
  AccountManagamentPage,
  Basket,
  ChangePasswordPage,
  Home,
  MyPlaylist,
  ResetPasswordEmailPage,
  ResetPasswordPhonePage,
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/public-offer" element={<PublicOffer />} />
        <Route path="/changePassword" element={<ChangePasswordPage />} />
        <Route
          path="/reset_password/confirm"
          element={<ResetPasswordEmailPage />}
        />
        <Route path="/resetPassword" element={<ResetPasswordPhonePage />} />
        <Route path="/accountManagement" element={<AccountManagamentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
