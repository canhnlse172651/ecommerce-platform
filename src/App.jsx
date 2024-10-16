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
import BlogDetail from "./pages/Blog-detail";
import Dashboard from "./pages/Dashboard";
import AccoutDetail from "./pages/Dashboard/Accout-detail";
import AccountOrder from "./pages/Dashboard/Accout-order";
import AccountAddress from "./pages/Dashboard/Accout-address";
import { PATHS } from "./constant/path";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleGetProfile } from "./store/Reducer/authReducer";
import { handleGetCart } from "./store/Reducer/cartReducer";
import PrivateRoute from "./components/PrivateRoute";
import Returns from "./pages/Return";
import PaymentMethod from "./pages/Payment-method";
function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetProfile());
    dispatch(handleGetCart());
  }, []);
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={PATHS.ABOUT} element={<About />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path={PATHS.PRODUCTS} element={<Product />} />
        <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={PATHS.BLOG} element={<Blog />} />
        <Route path={PATHS.BLOG_DETAIL} element={<BlogDetail />} />
        <Route path={PATHS.RETURN}  element={<Returns/>} />
        <Route path={PATHS.PAYMENT_METHOD}  element={<PaymentMethod/>} />


        <Route element={<PrivateRoute />}>
          <Route path={PATHS.CHECKOUT} element={<Checkout />} />
          <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />
          <Route path={PATHS.CART} element={<Cart />} />
          <Route path={PATHS.PROFILE.INDEX} element={<Dashboard />}>
            <Route index element={<AccoutDetail />} />
            <Route
              path={PATHS.PROFILE.PROFILE_ORDER}
              element={<AccountOrder />}
            />
            <Route
              path={PATHS.PROFILE.PROFILE_ADDRESS}
              element={<AccountAddress />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
