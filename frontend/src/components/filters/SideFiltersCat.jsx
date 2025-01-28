import React, { useContext, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import SideFiltersPar from "./SideFiltersPar";
import { StoreContext } from "../../context/StoreContext";
import categories from "../../dummyData/dummyCategories";
const SideFilters = () => {
    const {filterCat,setFilterCat}=useContext(StoreContext)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [LatestCategory, setLatestCategory] = useState(null)

    const handleToggle = (category) => {
        setSelectedCategories((prevSelected) => {
          if (prevSelected.includes(category)) {
            const updatedCategories = prevSelected.filter((item) => item !== category);
            setFilterCat(updatedCategories);
            if (updatedCategories.length === 0) {
              setLatestCategory(null);
              setFilterCat(null)
            }
            return updatedCategories; // Return the updated state
          } else {
            setLatestCategory(category);
            setFilterCat([...prevSelected, category])
            return [...prevSelected, category]; // Add the category and return
          }
        });
      };

    return (
        <Box sx={{display:'flex'}} p={0} borderRadius={2}>
            <Box sx={{height:'100vh',p:2}}>
                <Typography variant="h6" mb={2}>
                    Filter by Category
                </Typography>
                <Box display="flex" flexDirection={"column"} flexWrap="wrap" gap={1}>
                    {categories.map((category) => (
                        <Chip
                            key={category}
                            label={category.charAt(0).toUpperCase() + category.slice(1)}
                            onClick={() => handleToggle(category)}
                            color={selectedCategories.includes(category) ? "primary" : "default"}
                            clickable
                        />
                    ))}
                </Box>
            </Box>
            {LatestCategory &&
            <SideFiltersPar LatestCategory={LatestCategory}></SideFiltersPar>
            }
        </Box>
    );
};

export default SideFilters;
