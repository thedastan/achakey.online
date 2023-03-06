import { Routes, Route } from "react-router-dom";
import ExcerptPlayList from "./pages/excerpt-playlist/ExcerptPlayList";
import { Basket, Home, MyPlaylist } from "./pages/Index";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="/excerpts/" element={<ExcerptPlayList />} />
      </Routes>
    </div>
  );
}

export default App;
