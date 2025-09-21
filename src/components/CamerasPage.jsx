import React from "react";
import cameras from "../data/camerasData";
import { useNavigate } from "react-router-dom";
import "./LaptopPage.css"; // reuse existing card/grid styling

export default function CamerasPage({ cart, setCart }) {
  const navigate = useNavigate();

  const handleAddToCart = (camera) => {
    const existing = cart.find((i) => i.id === camera.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === camera.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...camera, quantity: 1 }]);
    }
  };

  const getQuantity = (camera) => {
    const item = cart.find((i) => i.id === camera.id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="laptop-page-container">
      <div className="cart-top-right" onClick={() => navigate("/dashboard/cart")}>
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </div>

      <h2 className="page-title">Cameras Collection</h2>

      <div className="laptop-grid">
        {cameras.map((camera) => (
          <div key={camera.id} className="laptop-card">
            <img src={camera.image} alt={camera.name} className="laptop-image" />
            <h3 className="laptop-name">{camera.name}</h3>
            <p className="laptop-description">{camera.description}</p>
            <p className="laptop-price">{camera.price}</p>

            <button className="add-to-cart-btn" onClick={() => handleAddToCart(camera)}>
              Add to Cart {getQuantity(camera) > 0 && `(${getQuantity(camera)})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
