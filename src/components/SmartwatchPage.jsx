import React from "react";
import smartwatches from "../data/smartwatchesData"; // your smartwatch data
import { useNavigate } from "react-router-dom";
import "./LaptopPage.css"; // reuse the same styles

export default function SmartwatchPage({ cart, setCart }) {
  const navigate = useNavigate();

  // Add item to cart
  const handleAddToCart = (watch) => {
    const existing = cart.find((item) => item.id === watch.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...watch, quantity: 1 }]);
    }
  };

  // Get quantity of this watch in cart
  const getQuantity = (watch) => {
    const item = cart.find((i) => i.id === watch.id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="laptop-page-container">
      <div
        className="cart-top-right"
        onClick={() => navigate("/dashboard/cart")}
      >
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </div>

      <h2 className="page-title">Our Smartwatches</h2>

      <div className="laptop-grid">
        {smartwatches.map((watch) => (
          <div key={watch.id} className="laptop-card">
            <img src={watch.image} alt={watch.name} className="laptop-image" />
            <h3 className="laptop-name">{watch.name}</h3>
            <p className="laptop-description">{watch.description}</p>
            <p className="laptop-price">{watch.price}</p>

            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(watch)}
            >
              Add to Cart {getQuantity(watch) > 0 && `(${getQuantity(watch)})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
