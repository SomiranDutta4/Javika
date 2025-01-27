import React, { useContext, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem'

const Home = () => {
  const { BuyPage } = useContext(StoreContext)

  const [category, setCategory] = useState("All");
  const [isCategorySet, setCatset] = useState(false)

  return (
    <div>
      {BuyPage &&
        <FoodItem></FoodItem>
      }
      {!BuyPage &&
        <>
          <Header />
          <ExploreMenu isCategorySet={isCategorySet} category={category} setCategory={setCategory} />
          <FoodDisplay category={category} isCategorySet={isCategorySet} setCatset={setCatset} />
          <AppDownload />
        </>
      }
    </div>
  )
}

export default Home