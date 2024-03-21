import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

export default function BrowseItem({ listing, clickHandler }) {
  return (
    <Paper sx={{ marginBottom: '20', width:"90%"}}>
      <Box display="flex" listid={listing._id} onClick={() => clickHandler(listing)}>
        <Box padding="10" flex="0 0 auto" width="33%">
          <img listid={listing._id} className="squareImg" src={listing.url} />
        </Box>
        <Box
          listid={listing._id}
          padding="10"
          flex="1"
          fontSize="20"
          height="120px"
          overflow={'hidden'}
          sx={{
            maskImage:
              'linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)',
          }}
        >
          <Typography variant="body2" color="green" component="div">
            ● 0.3 mi away
          </Typography>
          <Typography variant="body1" color="inherit" component="div">
            {listing.description}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
