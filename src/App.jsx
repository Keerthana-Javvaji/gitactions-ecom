import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import LaptopPage from "./components/LaptopPage";
import SmartphonePage from "./components/SmartphonePage";
import BluetoothDevicesPage from "./components/BluetoothDevicesPage"; // correct import
import SmartwatchPage from "./components/SmartwatchPage";
import CartPage from "./components/CartPage";
import Navbar from "./components/Navbar";
import PaymentPage from "./components/PaymentPage";
import ComputerAccessoriesPage from "./components/ComputerAccessoriesPage";
import SpeakersPage from "./components/SpeakersPage";
import CamerasPage from "./components/CamerasPage";


function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router basename="/gitactions-ecom/">
      <Navbar cartCount={totalQuantity} />

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Product Pages */}
        <Route path="/dashboard/laptops" element={<LaptopPage cart={cart} setCart={setCart} />} />
        <Route path="/dashboard/smartphones" element={<SmartphonePage cart={cart} setCart={setCart} />} />
        <Route path="/dashboard/bluetooth" element={<BluetoothDevicesPage cart={cart} setCart={setCart} />} /> {/* corrected */}
        <Route path="/dashboard/smartwatches" element={<SmartwatchPage cart={cart} setCart={setCart} />} />
        <Route path="/dashboard/computerAccessories" element={<ComputerAccessoriesPage cart={cart} setCart={setCart} />} />
        <Route path="/dashboard/speakers" element={<SpeakersPage cart={cart} setCart={setCart} />} />
        <Route path="/dashboard/cameras" element={<CamerasPage cart={cart} setCart={setCart} />} />

        {/* Cart & Payment */}
        <Route path="/dashboard/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/dashboard/payment" element={<PaymentPage />} />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
