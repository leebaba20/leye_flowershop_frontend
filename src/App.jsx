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
import ApiComponent from './components/ApiComponent';
import Bestseller from './components/Bestseller/Bestseller';
import LatestCollection from './components/latest_collections/Latestcollections';

// Utils
import ProtectedRoute from './utils/ProtectedRoute';

// Layout
import Layout from './components/layout/Layout';

// Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <Routes>
            {/* Wrap routes that share navbar/footer inside Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="bestsellers" element={<Bestseller showLimited={false} />} />
              <Route path="latest-collections" element={<LatestCollection showLimited={false} />} />
              <Route path="about" element={<About />} />
              <Route path="service" element={<Service />} />
              <Route path="contact" element={<Contact />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="signup-success" element={<SignupSuccess />} />
              <Route path="payment-success" element={<PaymentSuccess />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="search" element={<Search />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="api-test" element={<ApiComponent />} />
              <Route path="payment-callback" element={<PaymentCallback />} />

              {/* Protected Routes */}
              <Route
                path="logout"
                element={
                  <ProtectedRoute>
                    <Logout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              {/* Catch all unmatched routes */}
              <Route path="*" element={<Notfound />} />
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
