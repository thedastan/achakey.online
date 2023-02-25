import Footer from "../footer/Footer";
import Header from "../header/Header";
import MenuBar from "../ui/MenuBar";

interface IMain {
  children: JSX.Element;
}

export default function PageRouting({ children }: IMain) {
  return (
    <>
      <MenuBar>
        <Header />
        <main>{children}</main>
        <Footer />
      </MenuBar>
    </>
  );
}
