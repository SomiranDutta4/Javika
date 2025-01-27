// import React, { useContext } from 'react'
import './FoodDisplay.css'
// import { StoreContext } from '../../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({category}) => {

//     const {food_list} = useContext(StoreContext)

//   return (
//     <div className='food-display' id='food-display'>
//         <h2 className='h2we'>Top dishes near you</h2>
//         <div className="food-display-list">
//             {food_list.map((item,index)=>{
//               if(category==="All" || category===item.category){
//                 return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
//               }      
//             })}
//         </div>
//     </div>
//   )
// }

// export default FoodDisplay

import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { Box, Grid2, MenuItem, Pagination, Paper, Stack, Typography } from '@mui/material';
import dummyData from '../../dummyData/dummy'
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

const FoodDisplay = ({ setCatset }) => {
  const [searchResults, setResults] = useState([])
  const [page, setPageNo] = useState(1)
  const handleChange = (event, value) => {
    setPageNo(value);
    console.log(value)
  };

  useEffect(() => {
    // setResults(dummyData)
    // console.log(dummyData)
    let newList = dummyData.slice(page * 6, page * 6 + 6)
    setResults(newList)
  }, [page, dummyData])
  return (
    <>
      <Container>
        <h1>search results</h1>
        <Container sx={{my:1.5}}>
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
          <Grid2 container spacing={2}>
            {searchResults.map((item, index) => {
              return (
                <Grid2 sx={{cursor:'pointer'}} size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }} key={index}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Box>
                      <img style={{borderRadius:'5px', width:'100%'}} src={item.imageUrl}></img>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className='spanItems-details'>
                        Price:
                        {item.price}
                      </span>
                      <span className='spanItems-details'>
                        Available Units:
                        {item.availableUnit}
                      </span>
                    </Box>
                    <Box>
                      <Typography >
                        Product:
                        {item.productName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography >
                        Location:
                        {item.farmLocation}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid2>
              )
            })}
          </Grid2>
        </Box>
        <Pagination onChange={handleChange} variant="outlined" shape="rounded" sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }} count={10} color='primary' />
      </Container>
    </>
  )
}

export default FoodDisplay
