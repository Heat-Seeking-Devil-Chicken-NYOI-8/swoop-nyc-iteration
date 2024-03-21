import React from 'react';
import { Box, Typography } from '@mui/material';

const ListingPopUp = ({listing, clickHandler}) => {

  return (
    <Box
      className="listingPopUp"
      style={{
        width: '250px',
        height: '250px',
        display:'flex',
        flexDirection: "column",
        justifyContent:"center",
        alignItems:'center',
        border: '1px solid grey',
        borderRadius: '10px',
        backgroundColor:'#fff'
      }}
    >
      <Typography>{listing.description}</Typography>
      <Box flex="0 0 auto" width="80%">
      <img
        src={listing.url}
        className="squareImg"
        onClick={() => clickHandler(listing)}
      />
    </Box>
    </Box>
  );
};

export default ListingPopUp;
