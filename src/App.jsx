import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbarfiles/Navbar";
import Footer from "./components/footerfiles/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Service from "./components/pages/Service";
import Contact from "./components/pages/Contact";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Cart from "./components/pages/Cart";
import Search from "./components/pages/Search";
import Notfound from "./components/pages/Notfound";
import ProductDetails from "./components/pages/ProductDetails";
import Bestseller from "./components/Bestseller/Bestseller";
import Latestcollections from "./components/latest_collections/Latestcollections";
import SignupSuccess from "./components/pages/SignupSuccess";
import AllProducts from "./components/pages/AllProducts";
import { CartProvider } from './context/CartProvider';
import { UserProvider } from './context/UserContextProvider';

function App() {
  return (
    <UserProvider> {/* Wrap your app with UserProvider */}
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/bestsellers" element={<Bestseller />} />
            <Route path="/latest-collections" element={<Latestcollections />} />
            <Route path="/signup-success" element={<SignupSuccess />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
