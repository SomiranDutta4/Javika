import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img className='addd iconsSidebar' src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img className='listt iconsSidebar' src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img className='orderr iconsSidebar' src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/SellerReq' className="sidebar-option">
          <img className='verifications iconsSidebar' src="https://static.thenounproject.com/png/2900935-200.png" alt="" />
          <p>Seller verifications</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar