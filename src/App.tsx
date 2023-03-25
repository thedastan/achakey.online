import { Routes, Route } from "react-router-dom";
import {
  AccountManagamentPage,
  AudioPlayerBottom,
  Basket,
  ChangePasswordPage,
  DetailsAlbums,
  ExcerptPlayList,
  Home,
  NotFound,
  PrivacyPolicy,
  PublicOffer,
  MyPlaylist,
  Navigation,
  ResetPasswordEmailPage,
  ResetPasswordPhonePage,
} from "./pages/Index";
import BottomPlayer from "./components/bottom-audio-player/BottomPLayer";

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
      <BottomPlayer />
    </div>
  );
}

export default App;
