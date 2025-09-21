import React, { useState } from "react";
import "./PaymentPage.css";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const confirmPay = window.confirm(
      `Are you sure you want to proceed with ${selectedMethod.toUpperCase()} payment?`
    );
    if (!confirmPay) return;

    // Basic validation
    if (selectedMethod === "card" && (!formData.cardNumber || !formData.expiry || !formData.cvv)) {
      setMessage("Please fill all card details.");
      return;
    }
    if (selectedMethod === "upi" && !formData.upiId) {
      setMessage("Please enter your UPI ID.");
      return;
    }
    if (selectedMethod === "netbanking" && !formData.bank) {
      setMessage("Please select a bank.");
      return;
    }
    if (selectedMethod === "wallet" && !formData.wallet) {
      setMessage("Please select a wallet.");
      return;
    }

    // TODO: Call backend API here for real payment processing
    setMessage(`Payment via ${selectedMethod.toUpperCase()} is successful!`);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Select Payment Method</h2>

        <div className="payment-options">
          {["card", "upi", "netbanking", "wallet"].map((method) => (
            <label key={method} className={selectedMethod === method ? "selected" : ""}>
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={selectedMethod === method}
                onChange={() => {
                  setSelectedMethod(method);
                  setMessage("");
                }}
              />
              {method === "card"
                ? "Credit / Debit Card"
                : method === "upi"
                ? "UPI (PhonePe / GooglePay / Paytm)"
                : method === "netbanking"
                ? "Net Banking"
                : "Wallet (PhonePe / Paytm)"}
            </label>
          ))}
        </div>

        <div className="payment-inputs">
          {selectedMethod === "card" && (
            <>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                onChange={handleInputChange}
              />
            </>
          )}
          {selectedMethod === "upi" && (
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID (example@okhdfcbank)"
              onChange={handleInputChange}
            />
          )}
          {selectedMethod === "netbanking" && (
            <select name="bank" onChange={handleInputChange}>
              <option value="">Select Bank</option>
              <option value="HDFC">HDFC</option>
              <option value="ICICI">ICICI</option>
              <option value="SBI">SBI</option>
              <option value="Axis">Axis Bank</option>
            </select>
          )}
          {selectedMethod === "wallet" && (
            <select name="wallet" onChange={handleInputChange}>
              <option value="">Select Wallet</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Paytm">Paytm</option>
              <option value="GooglePay">Google Pay</option>
            </select>
          )}
        </div>

        <button className="payment-btn" onClick={handlePayment}>
          Pay Now
        </button>

        {message && (
          <p className={`payment-message ${message.includes("successful") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
