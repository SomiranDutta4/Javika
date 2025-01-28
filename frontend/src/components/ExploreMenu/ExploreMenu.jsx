import React, { useContext } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ExploreMenu = ({ category, setCategory }) => {
    const { food_list, setFoodList } = useContext(StoreContext)
    const handleCategory=(cat)=>{
        //fetch API
        
    }

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1 className='h1e'>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of Organic Products</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                                <p className='item_menu'>{item.menu_name}</p>
                            </div>
                        )
                    })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu