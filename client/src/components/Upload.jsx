import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavPosition, savePhoto } from '../mainSlice';
import { Box, Typography, Button, Icon, Input } from '@mui/material';
import { Upgrade } from '@mui/icons-material';

export default function Upload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*************************** HANDLER FUNCTIONS ****************************************** */
  //takes in the file and sends to back end ->
  //responds with URL and coordinates of photo. ->
  //sets the newListingPhoto state and navigates to the preview listing page
  const handleFileChange = async (e) => {
    let form_data = new FormData();
    form_data.append('file', e.target.files[0]);

    const data = await fetch('/listing', {
      method: 'POST',
      body: form_data,
    });
    const { url, coor } = await data.json();
    dispatch(savePhoto({ url: url, coor: coor }));
    navigate('/previewlisting');
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh"
      alignItems="center">
      <Button
        component="label"
        sx={{
          border: '5px dotted #ccc',
          minHeight: '50vh',
          maxWidth: '50vw',
          marginTop: 'auto',
          marginBottom: '28vh',
          marginX: 'auto',
          paddingX: '5vw',
          color: '#999',
        }}
      >
        <Input
          type="file"
          id="file"
          name="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          style={{
            width: '1',
            height: '1',
            marginTop: '3vh',
            marginX: '5vw',
            marginBottom: '6vh',
            visibility: 'hidden',
            zIndex: '2',
            position: 'absolute',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Upgrade sx={{ fontSize: '20vw', maxBlockSize: '130px' }} />
          <br />
          <Typography
            variant="body2"
            textAlign="center"
            fontSize={'8vw'}
            maxblocksizeize="180px"
          >
            Upload
            <br />
            Photo
          </Typography>
          <br />
        </Box>
      </Button>
    </Box>
  );
}
