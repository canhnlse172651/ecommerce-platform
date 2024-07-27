import Header from "@/components/Header";
import Footter from "@/components/Footer";
import MobileMenuContainer from "@/components/Mobile-menu-container";
import AuthComponent from "@/components/AuthComponent";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footter />
      </div>
      <MobileMenuContainer />
      <AuthComponent />
      <div className="mobile-menu-overlay" />
      <button id="scroll-top" title="Back to Top">
        <i className="icon-arrow-up"></i>
      </button>
    </>
  );
}

export default MainLayout;
