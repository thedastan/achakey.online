import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { Basket, AllPlaylist, Header, Home, MyPlaylist } from "./pages/Index";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="/all-playlist/" element={<AllPlaylist />} />
      </Routes>
    </div>
  );
}

export default App;
