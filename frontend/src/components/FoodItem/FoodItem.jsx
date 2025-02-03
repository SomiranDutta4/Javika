import React, { useContext, useEffect } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Box, Button, Card, Container, Grid, Grid2, MenuItem, Paper, Select, Stack, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
// import dummyFarmers from '../../dummyData/dummyFarmers'
import axios from 'axios'



function FoodItem() {
  const { cartItems, addToCart, setBuyPage, foodItem, setFoodItem, url, user } = useContext(StoreContext);

  // const { } = useContext(StoreContext);
  // const [count, setCount] = useState(10);

  const [addCount, setAddCount] = useState(1)
  const [isAdding, setisAdding] = useState(false)
  const [currPrice, setPrice] = useState(null);
  const [selectedItem, setSelected] = useState({})
  const [farmers, setFarmers] = useState({})
  // const handleCount = (event) => {
  // setCount(event.target.value)
  // }


  const addIteminc = async () => {
    if (!selectedItem || Object.keys(selectedItem).length === 0) {
      alert("Please select a seller first.");
      return;
    }

    // Ensure the user can't add more than the available stock
    if (addCount >= selectedItem.units) {
      alert("You have reached the maximum stock limit for this item.");
      return;
    }

    setAddCount(addCount + 1);

    let newUrl = url + "/api/cart/add";
    await axios.post(newUrl, {
      user,
      selectedItem
    });
  };

  const decreaseCountAdd = async () => {
    if (!selectedItem || Object.keys(selectedItem).length === 0) {
      alert("Please select a seller first.");
      return;
    }

    let newUrl = url + "/api/cart/remove";
    await axios.post(newUrl, { user, selectedItem });

    setAddCount((prev) => {
      if (prev === 0) {
        setisAdding(false);
        return prev; // Don't decrease below 1
      }
      return prev - 1;
    });
  };


  // const decreaseCountAdd = async () => {
  //   if (!selectedItem || Object.keys(selectedItem).length === 0) {
  //     alert("Please select a seller first.");
  //     return;
  //   }

  //   let newUrl = url + '/api/cart/remove';
  //   await axios.post(newUrl, {
  //     user,
  //     selectedItem
  //   });

  //   if (addCount - 1 === 0) {
  //     setisAdding(false);
  //     return;
  //   }
  //   setAddCount(addCount - 1);
  // };



  // if (addCount - 1 === 0) {
  //   setisAdding(false);
  //   return;
  // }
  // setAddCount(addCount - 1);


  const handleBackToMainPag = () => {
    setFoodItem({})
    setBuyPage(false)
  }
  // const addtoCart = async () => {
  // let newUrl = url + '/api/cart/add';
  // await axios.post(newUrl, foodItem);
  // }
  // const removeCart = async () => {
  // let newUrl = url + '/api/cart/remove';
  // await axios.post(newUrl, foodItem)
  // }
  useEffect(() => {
    const getFood = async () => {
      const response = await axios.post(url + '/api/food/getone', { foodId: foodItem._id });
      console.log(response.data)
      // setFoodItem(response.data.food);
      setFarmers(response.data.listed)
      // const { prices, ...rest } = response.data.food;
      // setSelected(rest);
    }
    getFood();
  }, [foodItem])



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
                  {foodItem.name}
                </Typography>
                <Divider></Divider>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                <Box sx={{ paddingLeft: '10px' }}>
                  <Typography variant='h6'>
                    {currPrice}
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
                      <div onClick={addIteminc}>Add to Cart</div>
                    )}
                  </div>
                </Box>

              </Box>
              <Box sx={{ paddingLeft: '10px' }}>
                <Divider />
                <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: '400', my: 2 }}>
                  Choose Your Farm:
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid2>


        {/* <Grid2 size={{ xs: 12, md: 6 }}>
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
        </Grid2> */}
        {farmers.length > 0 && (
          <Box sx={{ paddingLeft: '10px' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: '400', my: 2 }}>
              Choose Your Farm:
            </Typography>
            <RadioGroup
              value={selectedItem?._id || ""}
              onChange={(event) => {
                const selectedFarmer = farmers.find(farmer => farmer._id === event.target.value);
                if (selectedFarmer) {
                  setSelected(selectedFarmer);
                  setPrice(`₹${selectedFarmer.price}`);
                  setAddCount(1); // Reset quantity
                  setisAdding(false); // Reset add button state
                }
              }}
            >
              {farmers.map((farmer) => (
                <FormControlLabel
                  key={farmer._id}
                  value={farmer._id}
                  control={<Radio />}
                  label={`${farmer.farmerId.name} - ₹${farmer.price} (Available: ${farmer.units})`}
                />
              ))}
            </RadioGroup>
          </Box>
        )}


      </Grid2>

    </Container>

  )
}

export default FoodItem