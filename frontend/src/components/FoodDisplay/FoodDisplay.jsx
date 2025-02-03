// the jsx:
import React, { useContext, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { Box, Button, Drawer, Grid2, MenuItem, Pagination, Paper, Stack, Typography } from '@mui/material';
import dummyData from '../../dummyData/dummy'
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { StoreContext } from '../../context/StoreContext';
import Filters from '../filters/Filters';
import axios from 'axios';

const FoodDisplay = ({ category, isCategorySet, setCatset }) => {
  const { filterFood, filterCat, fetchFoodList, food_list, url, user, setFood_Item } = useContext(StoreContext)
  // const Cartapi = 'http://localhost:4000/api/cart/add'

  // const [count, setcount] = useState(1)
  // filteredResults

  // const [isAdding, setAdding] = useState(null);
  const { setBuyPage, setFoodItem } = useContext(StoreContext)
  const [OpenDrawer, setDrawerOpen] = useState(false)

  const buyPageHandler = (item) => {
    // setFoodItem(item);
    setBuyPage(true)
    setFoodItem(item)
  }
  // const countInc = async () => {
  //   let newUrl = url + '/api/cart/add';
  //   // await axios.post(newUrl, foodItem);
  //   // axios.post
  //   //fetch and add to cart
  //   setcount(count + 1);
  // }
  // const countDec = async () => {
  //   let newUrl = url + '/api/cart/remove';
  //   // await axios.post(newUrl, foodItem)
  //   if (count - 1 == 0) {
  //     //fetch and set to 0
  //     setAdding(null)
  //     return
  //   }
  //   setcount(count - 1);
  // }
  // useEffect(() => {
  //   console.log(user)
  // }, [user])


  const [searchResults, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [page, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleChange = (event, value) => {
    setPageNo(value);
  };

  // Handle category filtering logic
  // useEffect(() => {
  //   const filteredData = dummyData.filter(item =>
  //     category === "All" || item.category.toLowerCase() === category.toLowerCase()
  //   );
  //   setFilteredResults(filteredData);

  //   // Reset to page 1 when category is changed
  //   setPageNo(1);

  //   // Calculate total pages for pagination
  //   const pages = Math.ceil(filteredData.length / 6);
  //   setTotalPages(pages);
  // }, [category]);
  useEffect(() => {
    const filteredData = food_list.filter(item =>
      category === "All" || item.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredResults(filteredData);

    // Reset to page 1 when category is changed
    setPageNo(1);

    // Calculate total pages for pagination
    const pages = Math.ceil(filteredData.length / 6);
    setTotalPages(pages);
  }, [category, food_list]);

  // Paginate through the filtered results
  useEffect(() => {
    const startIndex = (page - 1) * 6;
    const paginatedData = filteredResults.slice(startIndex, startIndex + 6);
    setResults(paginatedData);
    console.log(searchResults)
  }, [page, filteredResults]);
  useEffect(()=>{
    console.log(searchResults)
  },[searchResults])

  return (
    <>
      <Container maxWidth="100%">
        <p style={{ fontFamily: 'Outfit', fontWeight: 'semibold', fontWeight: 500, fontSize: '2rem' }}>Search results</p>
        <Container sx={{ my: 1.5 }}>
          <Stack direction='row' spacing={2}>
            <MenuItem onClick={() => { setDrawerOpen(true) }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button>Filter</Button>
              <FilterListIcon />
            </MenuItem>
            <Drawer open={OpenDrawer} onClose={() => { setDrawerOpen(false) }}>
              <Filters></Filters>
            </Drawer>
            <MenuItem sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Typography>Sort</Typography>
              <SortIcon />
            </MenuItem>
          </Stack>
        </Container>
        <Box>
          <Grid2 container spacing={7}>
            {
              searchResults.map((item, index) => (
                <Grid2 sx={{ cursor: 'pointer', bgcolor: '#8ea484', borderRadius: '10px' }} size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Paper elevation={3} sx={{height:'100%', p: 2, borderRadius: '10px' }}>
                    <Container onClick={() => { buyPageHandler(item) }} sx={{ padding: 0 }}>
                      <Box sx={{display:'flex',justifyContent:'center'}}>
                        <img style={{ maxWidth: '50%', borderRadius: '5px', width: '100%' }} src={item.image} alt={item.name}></img>
                      </Box>
                      <Box>
                        {/* <Typography style={{ fontFamily: 'Outfit', fontWeight: 'semibold' }} variant='h5'>
                          {item.name}
                        </Typography> */}
                        <Typography
                          style={{ fontFamily: 'Outfit', fontWeight: 'semibold', whiteSpace: 'normal', maxWidth: '150px' }}
                          variant='h5'
                        >
                          {item.name}
                        </Typography>

                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ textAlign: 'center' }}>
                          {item.units > 0 ?
                            `available: ${item.units}` : "Not available"
                          }
                          {/* ₹{Math.min(...item.prices.map(p => p.price))} */}
                          {/* {item.prices.length > 0
                            ? ₹${Math.min(...item.prices.map(p => p.price))}
                            : "Not Available"}

                          ₹{item.price} */}
                        </Typography>
                      </Box>
                    </Container>
                    <Box sx={{ display: 'flex', marginTop: '30px' }}>
                      {/* <Box>
                        <Button onClick={() => { setAdding(item) }} className="button" variant="contained" sx={{ fontFamily: 'Outfit', backgroundColor: 'orange', color: 'white', borderRadius: '20px', padding: '10px 20px' }}>
                          Add to Cart
                        </Button>
                      </Box> */}
                      {/* {isAdding === item &&
                        <Box>

                          <Box>
                            <button onClick={countDec}>-</button>
                            <span>{count}</span>
                            <button onClick={countInc}>+</button>
                          </Box>

                        </Box>
                      } */}
                    </Box>
                  </Paper>
                </Grid2>
              ))
            }
          </Grid2>
        </Box>
        <Pagination onChange={handleChange} variant="outlined" shape="rounded" sx={{ marginTop: 9, display: 'flex', justifyContent: 'center' }} count={totalPages} color='primary' />
      </Container>
    </>
  )
}

export default FoodDisplay;