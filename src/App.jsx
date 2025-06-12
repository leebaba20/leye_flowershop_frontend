// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import { UserProvider } from './context/UserProvider';

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
import PaymentSuccess from './components/pages/PaymentSuccess';
import Shipping from './components/pages/Shipping';
import AllProducts from './components/pages/AllProducts';
import Notfound from './components/pages/Notfound';
import PaymentCallback from './components/pages/Paymentcallback';

// Components
import Navbar from './components/navbarfiles/Navbar';
import Footer from './components/footerfiles/Footer';
import ApiComponent from './components/ApiComponent';
import Bestseller from './components/Bestseller/Bestseller';
import LatestCollection from './components/latest_collections/Latestcollections';

// Utils
import ProtectedRoute from './utils/ProtectedRoute';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <h1>🚀 Hello from Production!</h1>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup-success" element={<SignupSuccess />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/search" element={<Search />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/payment-callback" element={<PaymentCallback />} />
              <Route path="/api-test" element={<ApiComponent />} />
              <Route path="/bestsellers" element={<Bestseller showLimited={false} />} />
              <Route path="/latest-collections" element={<LatestCollection showLimited={false} />} />

              {/* Protected Routes */}
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              {/* 404 Not Found */}
              <Route path="*" element={<Notfound />} />
            </Routes>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
