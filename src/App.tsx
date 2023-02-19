import { Routes, Route } from "react-router-dom";
import { Basket, Details, Header, Main, MyPlaylist } from "./pages/Index";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/my-playlist/:idPlay" element={<MyPlaylist />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
