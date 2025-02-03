import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import Rating from "@mui/material/Rating"; // Import MUI Rating component

const Orders = ({ url }) => {
  const { farmer } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  // Fetch all orders for the logged-in farmer
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list?farmerId=${farmer._id}`);

      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Orders fetched:", response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch orders");
    }
  };

  // Handle status change
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    const order = orders.find((o) => o._id === orderId);

    // Prevent invalid status updates (e.g., Out for Delivery → Food Processing, Delivered → Any other status)
    if (
      (order.status === "Out for delivery" && newStatus === "Food Processing") ||
      (order.status === "Delivered" && newStatus !== "Delivered")
    ) {
      toast.error("Invalid status update");
      return;
    }

    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus
      });

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
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
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.units}</p>
              <p>₹{order.amount}</p>

              {/* Status dropdown with disabled invalid options */}
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing" disabled={order.status === "Out for delivery" || order.status === "Delivered"}>
                  Food Processing
                </option>
                <option value="Out for delivery" disabled={order.status === "Delivered"}>
                  Out for delivery
                </option>
                <option value="Delivered">Delivered</option>
              </select>

              {/* Show the customer's rating if available */}
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
