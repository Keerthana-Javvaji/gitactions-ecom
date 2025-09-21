import React from "react";
import speakers from "../data/speakersData";
import { useNavigate } from "react-router-dom";
import "./LaptopPage.css"; // Reuse existing CSS for grid/cards

export default function SpeakersPage({ cart, setCart }) {
  const navigate = useNavigate();

  // Add speaker to cart or increase quantity
  const handleAddToCart = (speaker) => {
    const existing = cart.find((i) => i.id === speaker.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === speaker.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...speaker, quantity: 1 }]);
    }
  };

  // Get quantity of a speaker already in cart
  const getQuantity = (speaker) => {
    const item = cart.find((i) => i.id === speaker.id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="laptop-page-container">
      {/* Cart summary at top right */}
      <div className="cart-top-right" onClick={() => navigate("/dashboard/cart")}>
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </div>

      <h2 className="page-title">Speakers Collection</h2>

      <div className="laptop-grid">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="laptop-card">
            <img src={speaker.image} alt={speaker.name} className="laptop-image" />
            <h3 className="laptop-name">{speaker.name}</h3>
            <p className="laptop-description">{speaker.description}</p>
            <p className="laptop-price">{speaker.price}</p>

            <button className="add-to-cart-btn" onClick={() => handleAddToCart(speaker)}>
              Add to Cart {getQuantity(speaker) > 0 && `(${getQuantity(speaker)})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
