import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// BottomNav
// Three buttons
// Upload -> NewListing
// Browse -> BrowseListings
// Map -> Map

return (
    <> 
    <CssBaseline />
    <Box>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
        />

        <BottomNavigationAction/>
        <BottomNavigationAction/>
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />}/>

    </Box>
    </>
);