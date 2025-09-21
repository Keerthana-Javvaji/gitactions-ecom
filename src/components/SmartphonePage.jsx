import React from "react";
import smartphones from "../data/smartphonesData";
import { useNavigate } from "react-router-dom";
import "./smartphonePage.css";

export default function SmartphonePage({ cart, setCart }) {
  const navigate = useNavigate();

  const handleAddToCart = (phone) => {
    const existing = cart.find((item) => item.id === phone.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === phone.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...phone, quantity: 1 }]);
    }
  };

  const getQuantity = (phone) => {
    const item = cart.find((i) => i.id === phone.id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="smartphone-page-container">
      <div className="cart-top-right" onClick={() => navigate("/dashboard/cart")}>
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </div>

      <h2 className="page-title">Our Smartphone Collection</h2>

      <div className="smartphone-grid">
        {smartphones.map((phone) => (
          <div key={phone.id} className="smartphone-card">
            <img src={phone.image} alt={phone.name} className="smartphone-image" />
            <h3 className="smartphone-name">{phone.name}</h3>
            <p className="smartphone-description">{phone.description}</p>
            <p className="smartphone-price">{phone.price}</p>

            <button className="add-to-cart-btn" onClick={() => handleAddToCart(phone)}>
              Add to Cart {getQuantity(phone) > 0 && `(${getQuantity(phone)})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
