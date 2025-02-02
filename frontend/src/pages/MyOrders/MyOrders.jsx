import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const { url, token, user } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", { user: user });
        setData(response.data.orders);
        console.log(response.data)
    }

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user])
    useEffect(() => {
        // setData(prevData => [...prevData].reverse());
    }, [data])

    return (
        <div className='my-orders'>
            <h2 className='myordersp'>My Orders</h2>
            <div className="container">
                {data && data != [] &&

                    data.map((order, index) => {
                        return (
                            <div key={index} className='my-orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                {/* <p>{order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ","
                                    }
                                })}</p> */}
                                <p>
                                    {order.item.name}
                                </p>
                                <p>{order.units}</p>
                                <p>${order.amount}.00</p>
                                {/* <p>Items: {order.items.length}</p> */}
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })


                }
                {/* {data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if (index === order.items.length-1) {
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+","
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })} */}
            </div>
        </div>
    )
}

export default MyOrders