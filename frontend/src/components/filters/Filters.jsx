import { Box, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import SideFilters from './SideFilters'

const Filters = () => {
    const [modeSelected, setMode] = useState(1)

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ height: '100vh' }}>
                <ListItem onClick={() => { setMode(1) }}>
                    <ListItemButton>
                        <ListItemText primary="Category"></ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={() => { setMode(2) }}>
                    <ListItemButton>
                        <ListItemText primary="Location"></ListItemText>
                    </ListItemButton>
                </ListItem>
                {/* <ListItem>
                <ListItemButton>
                    <ListItemText primary="filate"></ListItemText>
                </ListItemButton>
            </ListItem> */}
            </Box>
            <Divider orientation='vertical'></Divider>
            <SideFilters modeSelected={modeSelected}></SideFilters>
        </Box>
    )
}

export default Filters
