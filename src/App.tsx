import { Routes, Route } from "react-router-dom";
import AllAlbums from "./pages/all-albums/AllAlbums";
import { Basket, AllPlaylist, Home, MyPlaylist } from "./pages/Index";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="/all-playlist/" element={<AllPlaylist />} />
        <Route path="/all-albums" element={<AllAlbums />} />
      </Routes>
    </div>
  );
}

export default App;
