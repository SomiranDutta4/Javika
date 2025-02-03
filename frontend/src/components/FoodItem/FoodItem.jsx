import React, { useContext, useEffect, useState } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';
import { Box, Button, Container, Grid, Paper, Typography, Radio, RadioGroup, FormControlLabel, Divider, Rating } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

function FoodItem() {
  const { addToCart, setBuyPage, foodItem, setFoodItem, url, user } = useContext(StoreContext);
  const [addCount, setAddCount] = useState(1);
  const [isAdding, setisAdding] = useState(false);
  const [currPrice, setPrice] = useState(null);
  const [selectedItem, setSelected] = useState({});
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const getFood = async () => {
      const response = await axios.post(url + '/api/food/getone', { foodId: foodItem._id });
      setFarmers(response.data.listed);
    };
    getFood();
  }, [foodItem]);

  const handleBackToMainPag = () => {
    setFoodItem({});
    setBuyPage(false);
  };

  const addIteminc = async () => {
    if (!selectedItem || Object.keys(selectedItem).length === 0) {
      alert("Please select a seller first.");
      return;
    }

    console.log("Adding to Cart:", selectedItem);

    if (addCount >= selectedItem.units) {
      alert("You have reached the maximum stock limit for this item.");
      return;
    }

    setAddCount((prevCount) => prevCount + 1);

    let newUrl = url + "/api/cart/add";
    try {
      const response = await axios.post(newUrl, { user, selectedItem });
      console.log("Add to Cart Response:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const decreaseCountAdd = async () => {
    if (!selectedItem || Object.keys(selectedItem).length === 0) {
      alert("Please select a seller first.");
      return;
    }

    let newUrl = url + "/api/cart/remove";
    await axios.post(newUrl, { user, selectedItem });

    setAddCount((prev) => {
      if (prev === 1) {
        setisAdding(false);
        return prev;
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    console.log(farmers);
  }, [farmers]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box onClick={handleBackToMainPag} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>Back</Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side - Product Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="subtitle1" color="textSecondary">{foodItem.category}</Typography>
            <Typography variant="h4" sx={{ fontWeight: '600', mb: 1 }}>{foodItem.name}</Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{currPrice || `₹${foodItem.marketPrice}`}</Typography>
              <Typography variant="body2" color="textSecondary">(inclusive of all taxes)</Typography>
            </Box>

            {/* Add to Cart Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Button variant="contained" sx={{ bgcolor: 'orange', color: 'white', borderRadius: '20px', px: 4, py: 1 }}
                onClick={() => (!isAdding ? setisAdding(true) : null)}>
                {isAdding ? (
                  <>
                    <Button onClick={decreaseCountAdd} sx={{ mr: 1, minWidth: '40px' }}>-</Button>
                    <Typography variant="h6">{addCount}</Typography>
                    <Button onClick={addIteminc} sx={{ ml: 1, minWidth: '40px' }}>+</Button>
                  </>
                ) : (
                  <>Add to Cart</>
                )}
              </Button>
              <ShoppingCartIcon sx={{ ml: 2, color: 'gray' }} />
            </Box>
          </Paper>
        </Grid>

        {/* Right Side - Description & Farmer Selection */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '10px', backgroundColor: '#ffffff' }}>
            <Typography variant="h5" sx={{ fontWeight: '500', mb: 2 }}>Product Description</Typography>
            <Typography variant="body1" sx={{ color: 'gray', mb: 3 }}>{foodItem.description}</Typography>
            <Divider sx={{ my: 2 }} />

            {farmers.length > 0 && (
              <>
                <Typography variant="h6" sx={{ fontWeight: '500', mb: 2 }}>Choose Your Seller</Typography>
                <RadioGroup
                  value={selectedItem?._id || ""}
                  onChange={(event) => {
                    const selectedFarmer = farmers.find(farmer => farmer._id === event.target.value);
                    if (selectedFarmer) {
                      setSelected(selectedFarmer);
                      setPrice(`₹${selectedFarmer.price}`);
                      setAddCount(1);
                      setisAdding(false);
                    }
                  }}
                >
                  {farmers.map((farmer) => (
                    <FormControlLabel
                      key={farmer._id}
                      value={farmer._id}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: '500' }}>
                            {farmer.farmerId.name} - ₹{farmer.price} (Available: {farmer.units})
                          </Typography>
                          {/* MUI Rating Component */}
                          <Rating
                            value={farmer.ratings || 0}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                          {/* Show Number of Ratings */}
                          <Typography variant="body2" sx={{ color: 'gray' }}>
                            ({farmer.ratedBy || 0})
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FoodItem;
