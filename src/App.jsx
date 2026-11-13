
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";
import Shop from "./pages/Shop";
import Favorites from "./pages/Favorites";
import ProductDetails from "./pages/ProductDetails";

function Placeholder({ title }) {
  return (
    <section className="placeholder-page">
      <span className="eyebrow">DRESSIFY COLLECTION</span>
      <h1>{title}</h1>
      <p>This page is currently being developed.</p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<Placeholder title="Page Not Found" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
