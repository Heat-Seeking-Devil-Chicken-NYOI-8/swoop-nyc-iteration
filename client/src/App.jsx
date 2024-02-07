import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ViewListIcon from '@mui/icons-material/ViewList';
import PlaceIcon from '@mui/icons-material/Place';
import Browse from './components/Browse';
import GetLocation from './components/GetLocation';
import Map from './components/Map';
import PreviewListing from './components/PreviewListing';
import Upload from './components/Upload';
import ViewListing from './components/ViewListing';
import { setNavPosition } from './mainSlice';
import { initializeListings } from './mainSlice';

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);

  //fetch initial data
  useEffect(() => {
    fetch('/listing')
      //data to get back should be an array of objects {name:, lat:, lng}
      .then((data) => data.json())
      .catch(() => console.log('i failed here'))
      .then((data) => {
        dispatch(initializeListings(data));
      })
      .catch(() => console.log('error initializing'));
  }, []);

  if (!state.location)
    return (
      <Box>
        <CssBaseline />
        <GetLocation />
      </Box>
    );
  else
    return (
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Box backgroundColor="#eee" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Browse />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/map" element={<Map />} />
              <Route path="/previewlisting" element={<PreviewListing />} />
              <Route path="/viewlisting" element={<ViewListing />} />
            </Routes>
          </Box>

          <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={state.navPosition}
              onChange={(event, newPosition) => {
                dispatch(setNavPosition(newPosition));
              }}
            >
              <BottomNavigationAction
                label="Upload"
                icon={<AddAPhotoIcon />}
                component={Link}
                to="/upload"
              />
              <BottomNavigationAction
                label="Browse"
                icon={<ViewListIcon />}
                component={Link}
                to="/"
              />
              <BottomNavigationAction
                label="Map"
                icon={<PlaceIcon />}
                component={Link}
                to="/map"
              />
            </BottomNavigation>
          </Paper>
        </Box>
      </Router>
    );
}
