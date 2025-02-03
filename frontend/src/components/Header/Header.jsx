import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div style={{zIndex:0,borderRadius:'10px'}} className='header'>
        <div className="header-contents">
            <h2>Order your Organic Groceries here</h2>
            <p>Choose from a diverse menu featuring a delactable array of authentic farm produces, delivered to your doorstep in no time!</p>
            <a href="#explore-menu"><button className='buttonwl'>View Catalog</button></a>
        </div>
    </div>
  )
}

export default Header