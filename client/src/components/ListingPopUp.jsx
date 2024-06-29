import React from 'react';
import { Box, Typography } from '@mui/material';

const ListingPopUp = ({ listing, clickHandler }) => {

  return (
    <Box
      className="listingPopUp"
      sx={{
        width: '250px',
        height: 'content-fit',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        border: '1px solid grey',
        borderRadius: '10px',
        backgroundColor: '#fff'
      }}
    >
      <Typography>{listing.description}</Typography>
      <Box position="relative" flexGrow={1} width="80%">
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
