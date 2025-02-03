import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import Rating from "@mui/material/Rating"; 
import { Button } from "@mui/material";

const Orders = ({ url }) => {
  const { farmer } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list?farmerId=${farmer._id}`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      });
      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    if (farmer?._id) {
      fetchAllOrders();
    }
  }, [farmer]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p className="no-orders">No orders available.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <img src={assets.parcel_icon} alt="Order Icon" />
              <div>
                <p className="order-item-food">
                  {order.item.name} x {order.units}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.units}</p>
              <p>₹{order.amount}</p>
              
              {order.status === "Waiting for farmer's acceptance" ? (
                <div className="order-acceptance">
                  <p>Accept Order?</p>
                  <Button className="accept-btn" onClick={() => updateOrderStatus(order._id, "Food Processing")}>
                    Yes
                  </Button>
                  <Button className="reject-btn" onClick={() => updateOrderStatus(order._id, "Order Rejected")}>
                    No
                  </Button>
                </div>
              ) : order.status === "Order Rejected" ? (
                <p style={{color:'red'}} className="order-rejected">Order Rejected</p>
              ) : (
                <select onChange={(event) => updateOrderStatus(order._id, event.target.value)} value={order.status}>
                  <option value="Food Processing" disabled={order.status !== "Food Processing"}>
                    Food Processing
                  </option>
                  <option value="Out for delivery" disabled={order.status === "Delivered"}>
                    Out for delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}

              {order.rating > 0 && (
                <div className="order-rating">
                  <p>Customer Rating:</p>
                  <Rating value={order.rating} precision={1} readOnly />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;