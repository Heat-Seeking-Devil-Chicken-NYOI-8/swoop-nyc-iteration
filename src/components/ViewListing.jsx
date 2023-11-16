import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNavPosition } from '../mainSlice';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FlagIcon from '@mui/icons-material/Flag';
import Paper from '@mui/material/Paper';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';
import Face2Icon from '@mui/icons-material/Face2';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Loader } from '@googlemaps/js-api-loader';

//Each ViewListing will need to have a unique id and also a <div> with an id='${listingID}-map
export default function ViewListing() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  /************************************************************************* */
  //create a static map
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADQU5Oic0aAZjytCZzVbo8MZOQSgNPqA4',
      version: 'weekly',
    });
    createMap({ lat: 40.706086, lng: -73.996864 }, 'listingMap', loader);
  }, []);

  /************************************************************ */
  //create a map on the view listing at
  //@Params {latlng} center
  async function createMap(center, div, loader) {
    loader.importLibrary('core').then(() => {
      //append an instance of google maps at a div with an ID of listingMap and center (lat,lng)
      const newMap = new google.maps.Map(document.getElementById(div), {
        center: center,
        zoom: 15,
      });
      //add marker to the newly created map
      const newMarker = new google.maps.Marker({
        //position: { lat: x, lng: y },
        position: center,
        map: newMap,
      });
    });
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
      >
        <Box display="flex" alignItems="flexStart" sx={{ margin: '10px' }}>
          <Button
            variant="outlined"
            startIcon={<KeyboardBackspaceOutlinedIcon />}
            size="small"
            sx={{ margin: '3px' }}
          >
            Back
          </Button>
        </Box>
        <div style={{ display: 'flex' }}>
          <Box display="flex" alignContent="center" sx={{ margin: '10px' }}>
            <img src="https://i.imgur.com/f7VXJQF.jpeg" width="50%" />
          </Box>
          <div
            id="listingMap"
            style={{ height: '100%px', width: '100%' }}
          ></div>
        </div>
        <Box
          display="flex"
          justifyContent="flexStart"
          alignItems="flexStart"
          sx={{ margin: '10px' }}
        >
          <FlagIcon />
        </Box>

        <Box sx={{ marginTop: '10px' }}>
          <Stack direction="row" spacing={1}>
            <Chip label="Chair" sx={{ width: '100px' }} />
            <Chip label="Blue" sx={{ width: '100px' }} />
            <Chip label="Big chair" sx={{ width: '100px' }} />
            <Chip label="Blue chair" sx={{ width: '100px' }} />
          </Stack>
        </Box>

        <Box display="flex" flexDirection="column" sx={{ margin: '10px' }}>
          <Typography variant="body2"> Comments </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="flexStart"
            sx={{ margin: '10px' }}
          >
            <Box display="flex" flexDirection="row" sx={{ margin: '10px' }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography> Omar: </Typography>
              <Typography> Cool couch!</Typography>
            </Box>

            <Box display="flex" flexDirection="row" sx={{ margin: '10px' }}>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Typography sx={{ marginLeft: '2px' }}> Jessica: </Typography>
              <Typography> Beautiful couch </Typography>
            </Box>

            <Box display="flex" flexDirection="row" sx={{ margin: '10px' }}>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Typography> Mitch: </Typography>
              <Typography> omg great color! </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
