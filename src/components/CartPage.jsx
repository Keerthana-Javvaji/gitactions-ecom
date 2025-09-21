import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  // Backend API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  // Remove item from cart
  const handleRemove = (item) => setCart(cart.filter((i) => i.id !== item.id));

  // Decrease quantity
  const handleDecrease = (item) => {
    const updatedCart = cart
      .map((i) =>
        i.id === item.id
          ? { ...i, quantity: Math.max(Number(i.quantity) - 1, 0) }
          : i
      )
      .filter((i) => i.quantity > 0);
    setCart(updatedCart);
  };

  // Increase quantity
  const handleIncrease = (item) => {
    const updatedCart = cart.map((i) =>
      i.id === item.id ? { ...i, quantity: Number(i.quantity) + 1 } : i
    );
    setCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const price =
      typeof item.price === "number"
        ? item.price
        : parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  // Proceed button
  const handleProceed = () => setShowConfirm(true);

  // Confirm order
  const handleConfirm = async () => {
    setShowConfirm(false);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      alert("You must be logged in to confirm the order.");
      return navigate("/login");
    }

    const orderPayload = {
      userId: loggedInUser.id,
      totalPrice: totalPrice,
    };

    try {
      const response = await fetch(`${API_URL}/api/orders/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
        credentials: "include",
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("Order confirmed:", data);

      setCart([]); // clear cart
      navigate("/dashboard/payment");
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm order. Please try again.");
    }
  };

  return (
    <div className="cart-page-container">
      <h2 className="page-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <p>{item.name}</p>
                <p>
                  {typeof item.price === "number"
                    ? `$${item.price.toFixed(2)}`
                    : item.price}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <button onClick={() => handleDecrease(item)}>-</button>
                  <span>
                    {Number(item.quantity)} item{item.quantity > 1 ? "s" : ""}
                  </span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>
              </div>
              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          ))}

          <div className="total-price">
            Total Cost: ${totalPrice.toFixed(2)}
          </div>
          <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
            <button onClick={handleProceed}>Proceed to Payment</button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="confirm-popup">
          <div className="confirm-box">
            <p>Are you sure you want to confirm your order?</p>
            <button onClick={handleConfirm}>Yes, Confirm</button>
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
