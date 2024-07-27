import Header from "@/components/Header";
import Footter from "@/components/Footer";
import MobileMenuContainer from "@/components/Mobile-menu-container";
import AuthComponent from "@/components/AuthComponent";
import MainContextProvider from "@/components/Context/MainContext";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
   <MainContextProvider>
    <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footter />
      </div>
      <MobileMenuContainer />
      <AuthComponent />
  
      <button id="scroll-top" title="Back to Top">
        <i className="icon-arrow-up"></i>
      </button>
   </MainContextProvider>
  );
}

export default MainLayout;
