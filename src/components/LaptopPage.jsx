import React from "react";
import laptops from "../data/laptopsData";
import { useNavigate } from "react-router-dom";
import "./LaptopPage.css";

export default function LaptopPage({ cart, setCart }) {
  const navigate = useNavigate();

  const handleAddToCart = (laptop) => {
    const existing = cart.find((item) => item.id === laptop.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === laptop.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...laptop, quantity: 1 }]);
    }
  };

  const getQuantity = (laptop) => {
    const item = cart.find((i) => i.id === laptop.id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="laptop-page-container">
      <div className="cart-top-right" onClick={() => navigate("/dashboard/cart")}>
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </div>

      <h2 className="page-title">Our Laptop Collection</h2>

      <div className="laptop-grid">
        {laptops.map((laptop) => (
          <div key={laptop.id} className="laptop-card">
            <img src={laptop.image} alt={laptop.name} className="laptop-image" />
            <h3 className="laptop-name">{laptop.name}</h3>
            <p className="laptop-description">{laptop.description}</p>
            <p className="laptop-price">{laptop.price}</p>

            <button className="add-to-cart-btn" onClick={() => handleAddToCart(laptop)}>
              Add to Cart {getQuantity(laptop) > 0 && `(${getQuantity(laptop)})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
