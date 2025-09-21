import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional, your navbar styling

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
    

      {/* Dashboard / Product Links */}
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/dashboard/laptops" className="nav-link">Laptops</Link>
      <Link to="/dashboard/smartphones" className="nav-link">Smartphones</Link>
      <Link to="/dashboard/bluetooth" className="nav-link">Bluetooth</Link>
      <Link to="/dashboard/smartwatches" className="nav-link">Smartwatches</Link>
      <Link to="/dashboard/computerAccessories" className="nav-link">Computer Accessories</Link>
      <Link to="/dashboard/speakers" className="nav-link">Speakers</Link>
      <Link to="/dashboard/cameras" className="nav-link">Camera</Link>

      {/* Cart & Payment */}
      <Link to="/dashboard/cart" className="nav-link">
        Cart ({cartCount})
      </Link>
      <Link to="/dashboard/payment" className="nav-link">Payment</Link>
        {/* Auth Links */}
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/signup" className="nav-link">Signup</Link>
    </nav>
  );
}
