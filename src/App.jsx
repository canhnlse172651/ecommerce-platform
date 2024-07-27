import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/Product-detail";
import Contact from "./pages/Contact";
import About from "./pages/About";


import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={< Home />} />
      <Route path="/about" element={< About />} />
      <Route path="/contact" element={< Contact />} />
      <Route path="/product" element={< Product />} />
      <Route path="/product/:slug" element={< ProductDetail />} />
        
      </Route>
    </Routes>
  );
}

export default App;
