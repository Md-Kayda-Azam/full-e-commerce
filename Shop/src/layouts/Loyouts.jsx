import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const Loyouts = () => {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Loyouts;
