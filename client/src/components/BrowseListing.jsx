import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Loader } from '@googlemaps/js-api-loader';

const BrowseListing = ({ point }) => {
  const loader = new Loader({
    apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
    version: 'weekly',
  });

  //Function to get distances in miles between two locations
  //@params {latlng} - start, end : starting and end locations
  function getMiles(start, end) {
    console.log(start, end);
    return (
      google.maps.geometry.spherical.computeDistanceBetween(start, end) / 5280
    ).toFixed(2);
  }

  //variable to store the disance
  //calculate the distance to this location from current saved location
  function help() {
    return loader.importLibrary('geometry').then(() => {
      return getMiles(point, { lat: 40.785091, lng: -73.968285 });
    });
  }

  help().then((res) => (
    distance = res));


  return (
    <Paper sx={{ marginBottom: '20' }}>
      <Box display="flex">
        <Box padding="10" flex="0 0 auto" width="33%">
          <img
            className="squareImg"
            src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i7FG2r.AIA_Y/v0/940x529.jpg"
          />
        </Box>
        <Box
          padding="10"
          flex="1"
          fontSize="20"
          height="150px"
          overflow={'hidden'}
          sx={{
            maskImage:
              'linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)',
          }}
        >
          <Typography>{`${distance} miles`}</Typography>
          <Typography variant="body1" color="inherit" component="div">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default BrowseListing;
