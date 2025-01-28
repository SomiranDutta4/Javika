import React, { useContext, useEffect, useState } from 'react'
import dummyData from '../../dummyData/dummy'
import { StoreContext } from '../../context/StoreContext'
import { Box, Chip, Typography } from '@mui/material';

const SideFiltersPar = ({ LatestCategory }) => {
    const { setFilterFood } = useContext(StoreContext);

    const [Food, setFiltered] = useState(null)

    const [selectedFood, setSelectedFood] = useState([])

    const handleToggle = (category) => {
        setSelectedFood((prev) => {
            if (selectedFood.includes(category)) {
                const updatedFood = prev.filter((item) => item !== category);
                return updatedFood
            } else {
                return [...prev, category]
            }
        })
    }

    useEffect(() => {
        if (LatestCategory) {
            // Filter dummyData based on the LatestCategory
            const filtered = dummyData.filter(
                (item) => item.category === LatestCategory
            );
            setFiltered(filtered);
            setFilterFood(filtered); 
        }
    }, [LatestCategory, setFilterFood]);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
                Filter by Food
            </Typography>
            {Food &&
                <Box display="flex" flexDirection={"column"} flexWrap="wrap" gap={1}>
                    {
                        Food.map((category) => (
                            <Chip
                                key={category}
                                label={category.productName}
                                // label={category.charAt(0).toUpperCase() + category.slice(1)}
                                onClick={() => handleToggle(category)}
                                color={selectedFood.includes(category) ? "primary" : "default"}
                                clickable
                            />
                        ))
                    }

                </Box>
            }
        </Box>
    )
}

export default SideFiltersPar
