// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import { UserProvider } from './context/UserContextProvider';

// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Service from './components/pages/Service';
import Contact from './components/pages/Contact';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Cart from './components/pages/Cart';
import Search from './components/pages/Search';
import ProductDetails from './components/pages/ProductDetails';
import SignupSuccess from './components/pages/SignupSuccess';
import Success from './components/pages/Success';
import Shipping from './components/pages/Shipping';
import AllProducts from './components/pages/AllProducts';
import Notfound from './components/pages/Notfound';

// Components
import Navbar from './components/navbarfiles/Navbar';
import Footer from './components/footerfiles/Footer';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is included


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
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
            <Route path="/signup-success" element={<SignupSuccess />} />
            <Route path="/success" element={<Success />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
