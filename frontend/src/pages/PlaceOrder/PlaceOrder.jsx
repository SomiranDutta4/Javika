import React, { useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, user, fetchCart, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [totalPrice, setPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const proceedToOrder = async () => {
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.street || !data.city || !data.state || !data.zipcode || !data.country) {
      alert("Please fill out all required fields before proceeding.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/order/place`, {address: data, paymentMethod:paymentMethod,cartItems: cartItems, user: user ,amount:totalPrice+40});
      console.log("Order Response:", response);
      console.log(data)
      if (response.data.success||response.status===200) {
        alert("Order placed successfully!");
        navigate('/myorders');
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please check your connection.");
    }
  };

  useEffect(() => {
    setPrice(getTotalCartAmount());
  }, [getTotalCartAmount]);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input className="emaill" required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input className="streett" required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input className="phonee" required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />

        {/* Payment Method Section */}
        <div className="payment-method" style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", marginTop: "20px", backgroundColor: "#f9f9f9" }}>
          <p className="title" style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Payment Method</p>
          <div className="payment-option" style={{ display: "flex", alignItems: "center", padding: "10px", borderRadius: "5px", backgroundColor: "white", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
            <input type="radio" name="paymentMethod" value="Cash on Delivery" checked readOnly style={{ marginRight: "10px", transform: "scale(1.2)" }} />
            <label style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>Cash on Delivery</label>
          </div>
        </div>


      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${totalPrice === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalPrice === 0 ? 0 : totalPrice + 40}</b>
            </div>
          </div>
          <button style={{backgroundColor:'#232a1c',color:'#eef5eb'}} onClick={proceedToOrder}>CONFIRM ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
