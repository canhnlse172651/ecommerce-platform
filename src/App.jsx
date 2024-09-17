import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/Product-detail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/Checkout-success";
import { PATHS } from "./constant/path";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleGetProfile } from "./store/Reducer/authReducer";
import { handleGetCart } from "./store/Reducer/cartReducer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(handleGetProfile())
      dispatch(handleGetCart())
  },[])
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={PATHS.ABOUT} element={<About />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path={PATHS.PRODUCTS} element={<Product />} />
        <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={PATHS.BLOG} element={<Blog />} />
        <Route path={PATHS.CART} element={<Cart />} />
        <Route path={PATHS.CHECKOUT} element={<Checkout />} />
        <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
