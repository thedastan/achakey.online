import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MenuBar from "../ui/MenuBar";

import { searchResult } from "../header/action-creators/Action";
import { useAppDispatch } from "../../hooks/Index";
import { Box } from "@chakra-ui/react";

interface IMain {
  children: JSX.Element;
}


export default function PageRouting({ children }: IMain,{}) {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

    return (
        <div  style={{overflow: "hidden",background: "#1D1D20"}}>
            <MenuBar>
                <Header/>
                <main
                    onClick={() => {
                        dispatch(searchResult(""));
                    }}
                >
                    {children}
                </main>
            </MenuBar>
            {window.location.pathname === "/all-playlist" && <Footer/>}
            {window.location.pathname === "/" && <Box display={{base:"block",lg:"none"}}><Footer/></Box>}
            {window.location.pathname === "/excerpts" && <Footer/>}
            {window.location.pathname === "/my-playlist" && <Footer/>}
            {window.location.pathname === "/basket" && <Footer/>}
            {window.location.pathname === "/privacy-policy" && <Footer/>}
            {window.location.pathname === "/public-offer" && <Footer/>}
        </div>
    );
}
