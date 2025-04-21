import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbarfiles/Navbar";
import Footer from "./components/footerfiles/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Service from "./components/pages/Service";
import Contact from "./components/pages/Contact";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import Search from "./components/pages/Search";
import Notfound from "./components/pages/Notfound";
import ProductDetails from "./components/pages/ProductDetails";
import Bestseller from "./components/Bestseller/Bestseller"; // Import Bestseller
import Latestcollections from "./components/latest_collections/Latestcollections"; // Import Latestcollections
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      {/* Wrap the entire application with CartProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/bestsellers" element={<Bestseller />} /> {/* Add Bestseller route */}
          <Route path="/latest-collections" element={<Latestcollections />} /> {/* Add Latestcollections route */}
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
