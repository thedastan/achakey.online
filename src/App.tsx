import {Routes, Route} from "react-router-dom";
import {
    AccountManagamentPage,
    AudioPlayerBottom,
    Basket,
    ChangePasswordPage,
    EmailVerifyPage,
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
    SearchResult,
} from "./pages/Index";
import BottomPlayer from "./components/bottom-audio-player/BottomPLayer";
import {useState} from "react";
import {Box} from "@chakra-ui/react";
import ToastMessage from './components/toast-message/ToastMessage';

enum AlbumOrTracks {
    ALBUM = "ALBUM",
    TRACKS = "TRACKS",
}

function App() {
    const [isActive, setActive] = useState(AlbumOrTracks.TRACKS);
    const isAlbum = isActive === AlbumOrTracks.ALBUM;
    const isTracks = isActive === AlbumOrTracks.TRACKS;
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupId, setOpenPopupId] = useState(false);
    return (
        <Box className={openPopup ? "modalBg" : ""}>
            <AudioPlayerBottom/>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/basket"
                       element={<Basket
                           openPopup={openPopup}
                           setOpenPopup={setOpenPopup}
                           openPopupId={openPopupId}
                           setOpenPopupId={setOpenPopupId}/>}/>
                <Route
                    path="/excerpts"
                    element={
                        <ExcerptPlayList
                            isAlbum={isAlbum}
                            isTracks={isTracks}
                            setActive={setActive}
                        />
                    }
                />
                <Route path="/my-playlist" element={<MyPlaylist/>}/>
                <Route path="/excerpts/details/:id" element={<DetailsAlbums openPopup={openPopup}
                                                                            setOpenPopup={setOpenPopup}/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/public-offer" element={<PublicOffer/>}/>
                <Route path="/changePassword" element={<ChangePasswordPage/>}/>
                <Route
                    path="/reset_password/confirm"
                    element={<ResetPasswordEmailPage/>}
                />
                <Route path="/login" element={<EmailVerifyPage/>}/>
                <Route path="/resetPassword" element={<ResetPasswordPhonePage/>}/>
                <Route path="/accountManagement" element={<AccountManagamentPage/>}/>
                <Route path="/search-result/:id" element={<SearchResult/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <BottomPlayer/>
        </Box>
    );
}

export default App;
