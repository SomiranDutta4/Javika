import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import Rating from "@mui/material/Rating";

const MyOrders = () => {
    const { url, user } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [ratings, setRatings] = useState({}); // Store ratings for each order

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", { user: user });
            setData(response.data.orders);
            console.log(response.data.orders)

            // Initialize ratings state from fetched orders
            const initialRatings = {};
            response.data.orders.forEach(order => {
                initialRatings[order._id] = order.rating || 0; // Set default rating (0 if not rated)
            });
            setRatings(initialRatings);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);
    useEffect(() => {
        console.log(data)
    }, [data])

    // Handle Rating Selection & Submission
    const handleRatingChange = async (item, farmerId, orderId, newValue) => {
        if (ratings[orderId] > 0) return; // Prevent re-rating

        setRatings((prevRatings) => ({ ...prevRatings, [orderId]: newValue })); // Update frontend state

        try {
            const response = await axios.post(url + "/api/order/rate", { orderId, rating: newValue, item, farmerId });

            if (response.data.success) {
                console.log("Rating updated successfully:", newValue);
                fetchOrders(); // Refresh the orders to reflect the new rating
            } else {
                alert("Error submitting rating. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("Failed to submit rating.");
        }
    };

    return (
        <div className="my-orders">
            <h2 className="myordersp">My Orders</h2>
            <div className="container">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} style={{border:'1px solid #536640'}} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <p>{order.item?.name || "Unknown Item"}</p>
                            <p>{order.units || "N/A"}</p>
                            <p>₹{order.amount || 0}.00</p>
                            <p>
                                <span style={{ color: '#536640' }}>&#x25cf;</span> <b>{order.status || "Pending"}</b>
                            </p>
                            {/* <button style={{ backgroundColor: '#cbe7bf' }} onClick={fetchOrders}>Track Order</button> */}

                            {order.status === "Delivered" && (
                                <div className="rate-order">
                                    <p>Rate this Order:</p>
                                    <Rating
                                        name={`rating-${order._id}`}
                                        value={ratings[order._id] || 0}
                                        precision={1}
                                        onChange={(event, newValue) =>
                                            ratings[order._id] === 0
                                                ? handleRatingChange(order.item, order.farmerId, order._id, newValue)
                                                : null
                                        }
                                        readOnly={ratings[order._id] > 0}
                                    />
                                    {ratings[order._id] > 0 && <p className="user-rating">Thank you for rating!</p>}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-orders">No orders available.</p>
                )}

                {/* {data&&data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} style={{border:'1px solid #8ea484',borderRadius:'4px'}} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <p>{order.item.name}</p>
                            <p>{order.units}</p>
                            <p>₹{order.amount}.00</p>
                            <p>
                                <span style={{color:'#536640'}}>&#x25cf;</span> <b>{order.status}</b>
                            </p>
                            <button style={{backgroundColor:'#cbe7bf'}} onClick={fetchOrders}>Track Order</button>

                            {order.status === "Delivered" && (
                                <div className="rate-order">
                                    <p>Rate this Order:</p>
                                    <Rating
                                        name={`rating-${order._id}`}
                                        value={ratings[order._id] || 0} // Default is 0
                                        precision={1} // Only full stars
                                        onChange={(event, newValue) =>
                                            ratings[order._id] === 0 // Allow only if not rated yet
                                                ? handleRatingChange(order.item, order.farmerId, order._id, newValue)
                                                : null
                                        }
                                        readOnly={ratings[order._id] > 0} 
                                    />
                                    {ratings[order._id] > 0 && (
                                        <p className="user-rating">Thank you for rating!</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-orders">No orders available.</p>
                )} */}
            </div>
        </div>
    );
};

export default MyOrders;
