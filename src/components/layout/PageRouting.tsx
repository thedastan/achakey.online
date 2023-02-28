import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MenuBar from "../ui/MenuBar";

import { searchResult } from "../header/action-creators/Action";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { useState } from "react";
interface IMain {
  children: JSX.Element;
}

export default function PageRouting({ children }: IMain) {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  return (
    <>
      <MenuBar>
        <Header />
        <main
          onClick={() => {
            dispatch(searchResult(""));
          }}
        >
          {children}
        </main>
      </MenuBar>
      {window.location.pathname === "/all-playlist" && <Footer />}
      {window.location.pathname === "/" && <Footer />}
      {window.location.pathname === "/basket" && <Footer />}
    </>
  );
}
