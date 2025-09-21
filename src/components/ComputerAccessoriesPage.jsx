import React from "react";
import computerAccessories from "../data/computerAccessoriesData";
import { useNavigate } from "react-router-dom";
import "./LaptopPage.css"; // Reuse existing CSS (same styles for grid/cards)

export default function ComputerAccessoriesPage({ cart, setCart }) {
  const navigate = useNavigate();

  // Add item to cart or increase quantity
  const handleAddToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Get quantity of an item already in cart
  const getQuantity = (item) => {
    const cartItem = cart.find((i) => i.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="laptop-page-container">
      {/* Cart summary at top right */}
      <div className="cart-top-right" onClick={() => navigate("/dashboard/cart")}>
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </div>

      <h2 className="page-title">Computer Accessories</h2>

      <div className="laptop-grid">
        {computerAccessories.map((item) => (
          <div key={item.id} className="laptop-card">
            <img src={item.image} alt={item.name} className="laptop-image" />
            <h3 className="laptop-name">{item.name}</h3>
            <p className="laptop-description">{item.description}</p>
            <p className="laptop-price">{item.price}</p>

            <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart {getQuantity(item) > 0 && `(${getQuantity(item)})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
