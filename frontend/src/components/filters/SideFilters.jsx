import React from 'react'
import SideFiltersCat from './SideFiltersCat'
import { Box } from '@mui/material'

const SideFilters = ({ modeSelected }) => {
    return (
        <Box sx={{ height: '100vh' }}>
            {modeSelected == 1 &&
                <SideFiltersCat></SideFiltersCat>
            }{modeSelected == 2 &&
                <SideFiltersCat></SideFiltersCat>
            }
        </Box>
    )
}

export default SideFilters
