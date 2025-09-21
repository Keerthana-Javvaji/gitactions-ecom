import React from "react";
import bluetoothDevices from "../data/BluetoothDevicesData";
import { useNavigate } from "react-router-dom";
import "./LaptopPage.css"; // reuse same styles

export default function BluetoothDevicesPage({ cart, setCart }) {
  const navigate = useNavigate();

  const handleAddToCart = (device) => {
    const existing = cart.find((item) => item.id === device.id && item.type === "bluetooth");
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === device.id && item.type === "bluetooth"
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...device, type: "bluetooth", quantity: 1 }]);
    }
  };

  const getQuantity = (device) => {
    const item = cart.find((i) => i.id === device.id && i.type === "bluetooth");
    return item ? item.quantity : 0;
  };

  return (
    <div className="laptop-page-container">
      <div className="cart-top-right" onClick={() => navigate("/dashboard/cart")}>
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </div>

      <h2 className="page-title">Bluetooth Devices</h2>

      <div className="laptop-grid">
        {bluetoothDevices.map((device) => (
          <div key={device.id} className="laptop-card">
            <img src={device.image} alt={device.name} className="laptop-image" />
            <h3 className="laptop-name">{device.name}</h3>
            <p className="laptop-description">{device.description}</p>
            <p className="laptop-price">{device.price}</p>

            <button className="add-to-cart-btn" onClick={() => handleAddToCart(device)}>
              Add to Cart {getQuantity(device) > 0 && `(${getQuantity(device)})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
