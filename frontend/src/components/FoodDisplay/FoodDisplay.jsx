import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { Box, Button, Grid2, MenuItem, Pagination, Paper, Stack, Typography } from '@mui/material';
import dummyData from '../../dummyData/dummy'
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

const FoodDisplay = ({category, isCategorySet, setCatset }) => {
  const [searchResults, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([]) // Store filtered results
  const [page, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleChange = (event, value) => {
    setPageNo(value);
  };

  // Handle category filtering logic
  useEffect(() => {
    // First filter the results based on the selected category
    const filteredData = dummyData.filter(item => 
      category === "All" || item.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredResults(filteredData);

    // Reset to page 1 when category is changed
    setPageNo(1);

    // Calculate total pages for pagination
    const pages = Math.ceil(filteredData.length / 6);
    setTotalPages(pages);
  }, [category]);

  // Paginate through the filtered results
  useEffect(() => {
    const startIndex = (page - 1) * 6;
    const paginatedData = filteredResults.slice(startIndex, startIndex + 6);
    setResults(paginatedData);
  }, [page, filteredResults]);

  return (
    <>
      <Container maxWidth="100%">
        <p style={{fontFamily:'Outfit', fontWeight: 'semibold' ,fontWeight:500, fontSize: '2rem'}}>Search results</p>
        <Container sx={{ my: 1.5 }}>
          <Stack direction='row' spacing={2}>
            <MenuItem sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Typography>Filter</Typography>
              <FilterListIcon />
            </MenuItem>
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
                <Grid2 sx={{ cursor: 'pointer' }} size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Box>
                      <img style={{ borderRadius: '5px', width: '100%' }} src={item.imageUrl} alt={item.productName}></img>
                    </Box>
                    <Box>
                      <Typography style={{fontFamily:'Outfit', fontWeight: 'semibold' }} variant='h5'>
                        {item.productName}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className='spanItems-details' style={{fontFamily:'Outfit', fontWeight: 'bold' }} variant='h6'>
                        ₹{item.price}
                      </span>
                      <Button className="button" variant="contained" sx={{marginTop:'30px',fontFamily:'Outfit' , backgroundColor: 'orange', color: 'white', borderRadius: '20px', padding: '10px 20px' }}>
                        Add to Cart
                      </Button>
                    </Box>
                  </Paper>
                </Grid2>
              ))
            }
          </Grid2>
        </Box>
        <Pagination onChange={handleChange} variant="outlined" shape="rounded" sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }} count={totalPages} color='primary' />
      </Container>
    </>
  )
}

export default FoodDisplay;
