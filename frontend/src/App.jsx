import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import OrdersPage from "./Pages/OrdersPage.jsx/OrdersPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import ProductListingPage from "./Pages/ProductListingPage/ProductListingPage";
import CartPage from "./Pages/CartPage/CartPage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage.jsx/ProfilePage";
import UpdateProfilePage from "./Pages/UpdateProfilePage.jsx/UpdateProfilePage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import MensProductListingPage from "./Pages/ProductListingPage/MensProductListingPage";
import WomensProductListingPage from "./Pages/ProductListingPage/WomensProductListingPage";
import CreateProductPage from "./Pages/CreateProductsPage/CreateProductPage";

// Load the Stripe publishable key
const stripePromise = loadStripe("your-publishable-key");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/products/createProduct"
                element={<CreateProductPage />}
              />
              <Route path="/products" element={<ProductListingPage />} />
              <Route
                path="/products/men"
                element={<MensProductListingPage />}
              />
              <Route
                path="/products/women"
                element={<WomensProductListingPage />}
              />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/me" element={<ProfilePage />} />
              <Route
                path="/profile/update/:id"
                element={<UpdateProfilePage />}
              />
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
