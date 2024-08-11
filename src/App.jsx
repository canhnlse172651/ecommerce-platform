import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/Product-detail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import { PATHS } from "./constant/path";


import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<MainLayout />}>
      <Route index element={< Home />} />
      <Route path={PATHS.ABOUT} element={< About />} />
      <Route path={PATHS.CONTACT} element={< Contact />} />
      <Route path={PATHS.PRODUCTS} element={< Product />} />
      <Route path={PATHS.PRODUCT_DETAIL} element={< ProductDetail />} />
      <Route path={PATHS.BLOG} element={< Blog />} />

        
      </Route>
    </Routes>
  );
}

export default App;
