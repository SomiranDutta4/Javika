import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Box, Button, Card, Container, Grid, Grid2, MenuItem, Paper, Select, Stack, Typography,Radio, RadioGroup, FormControlLabel } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import dummyFarmers from '../../dummyData/dummyFarmers'



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
              <Box sx={{ paddingLeft: '10px', textAlign: 'left', fontFamily: 'Outfit' }}>
                <Typography variant='h6' sx={{ fontFamily: 'Outfit', fontWeight: '300' }}>
                  {foodItem.category}
                </Typography >
                <Typography sx={{ marginBottom: 3, fontFamily: 'Outfit', fontWeight: '500' }} variant='h4'>
                  {foodItem.productName}
                </Typography>
                <Divider></Divider>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                <Box sx={{ paddingLeft: '10px' }}>
                  <Typography variant='h6'>
                    ₹{foodItem.price}/ {foodItem.availableUnit}
                  </Typography>
                  <Typography>
                    (inclusive of all taxes)
                  </Typography>
                </Box>
                {/* <MenuItem > */}
                <Box>
                  <div style={{ fontFamily: 'Outfit', backgroundColor: 'orange', color: 'white', borderRadius: '20px', padding: '10px 20px', marginRight: '10px' }} onClick={() => { (!isAdding) ? setisAdding(true) : console.log("do nothing") }} variant='outlined'>
                    {isAdding ? (
                      <>
                        <button onClick={decreaseCountAdd} style={{ border: '1px solid black', backgroundColor: 'white', color: 'black', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', marginRight: '5px' }}>-</button>
                        <span style={{ display: 'inline-block', border: '1px solid black', backgroundColor: 'white', color: 'black', borderRadius: '8px', padding: '8px 12px', minWidth: '30px', textAlign: 'center' }}>{addCount}</span>
                        <button onClick={addIteminc} style={{ border: '1px solid black', backgroundColor: 'white', color: 'black', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', marginLeft: '5px' }}>+</button>

                      </>
                    ) : (
                      <>Add to Cart</>
                    )}
                  </div>

                </Box>
                
              </Box>
              <Box sx={{ paddingLeft: '10px' }}>
  <Divider />
  <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: '400', marginTop: 2 }}>
    Choose Your Farm:
  </Typography>

  <RadioGroup
    name="farmSelection"
    onChange={(event) => {
      console.log("Selected farm:", event.target.value);
    }}
  >
    {dummyFarmers
      .filter((farmer) => foodItem.sellerId.includes(farmer.sellerId))
      .map((farmer) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }} key={farmer.sellerId}>
            <Box>
              <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: '400', marginTop: 2 }}>{farmer["Farm Name"]}</Typography>
              <Typography>{farmer["Farm Location"]}</Typography>
            </Box>
            <Box>
              <FormControlLabel
                value={farmer.sellerId}
                control={<Radio />}
                label=""
              />
            </Box>
          </Box>
        );
      })}
  </RadioGroup>
</Box>
            </Box>
            {/* <Box> */}
            {/* </Box> */}
          </Paper>
        </Grid2>

        {/* part 2*/}

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