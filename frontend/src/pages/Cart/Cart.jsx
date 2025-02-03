import React, { useEffect, useState } from 'react'
import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {

  const { setCartItems, cartItems, setUser, fetchCart, food_list, user, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate();
  const [totalAmt, setTotalAmt] = useState(0)
  const [deliveryCharges, setDelivery] = useState(40)


  // const fetchCart = async () => {
  //   const newUrl = url + '/api/cart/get';
  //   const response = await axios.post(newUrl, user);
  //   if (response.status === 200) {
  //     setCartItems(response.data.cart)
  //   }
  // }
  useEffect(() => {
    fetchCart()
  }, [user])

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem('user')))
  // }, [user])

  useEffect(() => {
    let total = 0;
    // Object.entries(cartItems).forEach(([id, item]) => {
    //   if (item.units > 0) {
    //     total += item.price * item.units;  // Add price * units to total
    //   }
    // });
    total = getTotalCartAmount()
    // Set the total amount
    setTotalAmt(total);
    console.log(cartItems)
  }, [cartItems])

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          {/* <p>Items</p> */}
          <p className='items-sss'>Title</p>
          <p className='items-sss'>Price</p>
          <p className='items-sss'>Quantity</p>
          <p className='items-sss'>Total</p>
          <p className='items-sss'>Remove</p>
        </div>
        <br />
        <hr />

        {/* {Object.entries(cartItems).map(( item, index) => {
          if (item.units > 0) {
            // setTotalAmt(totalAmt +Number(item.price))
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.imageUrl} alt={item.listing.foodId.name} />
                  <p>{item.listing.foodId.name}</p>
                  <p>${item.listing.price}</p>
                  <p>{item.units}</p>
                  <p>${item.price * item.units}</p>
                  <p onClick={() => removeFromCart(id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })} */}
        {cartItems && Object.entries(cartItems).map(([key, item], index) => {
          if (item?.units > 0) {
            return (
              <div style={{ backgroundColor: '#768f6b', borderRadius: '10px' }} key={key}>
                <div style={{ padding: '10px 5px 10px 5px', color: '#eef5eb', borderRadius: '10px' }} className='cart-items-title cart-items-item'>
                  {/* <img src={item.listing.foodId.image} /> */}
                  <p className='items-sss'>{item.listing.foodId.name}</p>
                  <p className='items-sss'>${item.listing.price}</p>
                  <p className='items-sss'>{item.units}</p>
                  <p className='items-sss'>${item.listing.price * item.units}</p>
                  <p className='items-sss cross' onClick={() => removeFromCart(item.listing._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}


      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalAmt}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryCharges}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmt + deliveryCharges}</b>
            </div>
          </div>
          <button style={{ backgroundColor: '#232a1c', color: '#cbe7bf' }} onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart