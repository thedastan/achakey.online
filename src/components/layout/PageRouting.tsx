import Footer from "../footer/Footer";
import Header from "../header/Header";

interface IMain {
  children: JSX.Element;
}

export default function PageRouting({ children }: IMain) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
