import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Box, Button, Card, Container, Grid, Grid2, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';



function FoodItem({ }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const { foodItem, setFoodItem, setBuyPage } = useContext(StoreContext);
  const [count, setCount] = useState(10);

  const [addCount, setAddCount] = useState(1)
  const [isAdding, setisAdding] = useState(false)

  const handleCount = (event) => {
    setCount(event.target.value)
  }
  const addIteminc = () => {
    setAddCount(addCount + 1);
  }
  const decreaseCountAdd = () => {
    if (addCount - 1 == 0) {
      setisAdding(false);
      return;
    }
    setAddCount(addCount - 1)
  }

  const handleBackToMainPag = () => {
    setFoodItem({})
    setBuyPage(false)
  }

  return (
    <Container width='mx'>
      <Box sx={{ display: 'flex', marginBottom: 2, justifyContent: 'flex-start' }}>
        <ArrowBackIcon sx={{ cursor: 'pointer' }} onClick={handleBackToMainPag}></ArrowBackIcon>
      </Box>

      {/* <Container sx={{ display: 'flex' }}> */}
      <Grid2 container spacing={7}>


        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper >
            <Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6'>
                  {foodItem.category}
                </Typography>
                <Typography sx={{ marginBottom: 3 }} variant='h6'>
                  {foodItem.productName}
                </Typography>
                <Divider></Divider>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 2 }}>
                <Box>
                  <Typography>
                    80 {foodItem.availableUnit}
                  </Typography>
                  <Typography>
                    {foodItem.price}
                  </Typography>
                  <Typography>
                    (inclusive of all taxes)
                  </Typography>
                </Box>
                {/* <MenuItem > */}
                <Box>
                  <Button onClick={()=>{setisAdding(true)}} variant='outlined'>Add
                    {/* <ShoppingCartIcon></ShoppingCartIcon> */}
                  </Button>
                  {isAdding &&
                    <>
                      <button onClick={decreaseCountAdd}>-</button>
                      <span>{addCount}</span>
                      <button onClick={addIteminc}>+</button>
                    </>
                  }
                </Box>
              </Box>

            </Box>
            {/* <Box> */}
            {/* </Box> */}
          </Paper>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper>
            <Box>
              <img style={{ width: '100%', borderRadius: '5px' }} src={foodItem.imageUrl}></img>
            </Box>

            <Box>
              <Typography variant='h5'>Product Details</Typography>
              <Box>
                <Typography variant='h6'>Unit</Typography>
                <Typography>{foodItem.availableUnit}</Typography>
              </Box>
              <Box>
                <Typography variant='h6'>Description</Typography>
                <Typography>{foodItem.description}</Typography>
              </Box>
              <Box>
                <Typography variant='h6'>Seller Details</Typography>
                <Typography>Seller ID: {foodItem.sellerId}</Typography>
                <Typography>Seller Name: {foodItem.sellerName}</Typography>
                <Typography>Farm Location: {foodItem.farmLocation}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
      {/* 
        <Container sx={{ height: '80vh' }}>
        </Container> */}


      {/* <Container sx={{ height: '80vh' }}>

      </Container> */}
    </Container>

    // </Container>

    // <div className='food-item'>
    //     <div className="food-item-img-container">
    //         <img className='food-item-image' src={url+"/images/"+image} alt="" />
    //         {!cartItems[id]
    //             ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
    //             :<div className='food-item-counter'>
    //               <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt='' />
    //               <p className='cartitemsp'>{cartItems[id]}</p>
    //               <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt='' />
    //               </div>
    //         }
    //     </div>
    //     <div className="food-item-info">
    //         <div className="food-item-name-rating">
    //             <p className='namewe'>{name}</p>
    //             <img className='ratingstars' src={assets.rating_starts} alt="" />
    //         </div>
    //         <p className="food-item-desc">{description}</p>
    //         <p className="food-item-price">${price}</p>
    //     </div>
    // </div>
  )
}

export default FoodItem