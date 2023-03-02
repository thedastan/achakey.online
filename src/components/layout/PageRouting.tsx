import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MenuBar from "../ui/MenuBar";

interface IMain {
  children: JSX.Element;
}

export default function PageRouting({ children }: IMain) {
  const navigation = useNavigate();

  return (
    <>
      <MenuBar>
        <Header />
        <main>{children}</main>
      </MenuBar>
      {/*{window.location.pathname === "/all-playlist" && <Footer />}*/}
      {/*{window.location.pathname === "/" && <Footer />}*/}
      {/*{window.location.pathname === "/basket" && <Footer />}*/}
    </>
  );
}
