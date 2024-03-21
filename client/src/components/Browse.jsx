import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveListing, setNavPosition } from '../mainSlice';
import {
  AppBar,
  Box,
  Toolbar,
  TextField,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Autocomplete,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import BrowseItem from './BrowseItem.jsx';

export default function Browse() {
  const listings = useSelector((state) => state.main.listings);
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  /****************************Handler function********************************** */
  function clickHandler(listing) {
    dispatch(setActiveListing(listing));
    navigate('/viewlisting');
  }

  let listingBundle = [];

  listingBundle = listings
    .filter((el) => included(el.tags, selectedTags))
    .map((el) => (
      <BrowseItem key={el._id} listing={el} clickHandler={clickHandler} />
    ));

  /************ matching tags ***************/
  function included(arr1, arr2) {
    if (arr2.length == 0) return true;
    const set1 = new Set(arr1);
    for (let i = 0; i < arr2.length; i++) {
      if (set1.has(arr2[i])) return true;
    }
    return false;
  }

  /*********** Searching by Tags **************/
  // const searchByTags = (listings) => {
  //   // console.log("hello!")
  // };

  // /********** Sort tags by frequency **********/
  // // takes in object of tags with frequencies
  // const sortTags = (tags) => {
  //   const output = [];
  //   for (let tag in tags) {
  //     const temp = [];
  //     temp.push(tag, tags[tag]);
  //     output.push(temp);
  //   }
  //   output.sort((a, b) => b[1] - a[1]);
  //   return output;
  // };

  // /********** Populating list items to render**********/
  const tagListItems = [];
  const tags = {};

  const populateTagList = (listings) => {
    if (listings.length > 0) {
      listings.forEach((el) => {
        el.tags.forEach((tag) => {
          tags[tag] ? tags[tag]++ : (tags[tag] = 1);
        });
      });

      for (let tag in tags) {
        tagListItems.push(
          <ListItemButton
            key={tag}
            onClick={() => {
              setSelectedTags([tag]);
            }}
          >
            <ListItemText primary={`${tag} (${tags[tag]})`} />
          </ListItemButton>
        );
      }
    }
  };

  populateTagList(listings);

  /********** Handle click on listing **********/

  return (
    <>
      <Box sx={{ backgroundColor: '#eee' }}>
        <AppBar position="fixed" height="1.5rem">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsOpen(true)}
            >
              <TuneIcon />
            </IconButton>

            {/* Swappable Drawer */}
            <Drawer
              anchor="left"
              size="sm"
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <List>{tagListItems}</List>
            </Drawer>
            <Autocomplete
              multiple
              id="search-tags"
              options={Object.keys(tags)}
              freeSolo
              onChange={(e,value)=>{setSelectedTags(value)}}
              renderTags={(value, getTagProps) => {
                return value.map((option, index) => {
                  console.log('map: option, index', option, index);
                  return (
                    <Chip
                      variant="filled"
                      label={option}
                      {...getTagProps({ index })}
                      size="medium"
                    />
                  );
                });
              }}
              renderInput={(params) => {
                // console.log("renderInput params: ", params)
                return (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder="Search By Tags"
                    size="small"
                  />
                );
              }}
              sx={{
                backgroundColor: 'white',
                margin: '10px',
                width: '100%;',
              }}
              size="small"
            />
            <SearchIcon sx={{ marginLeft: '3px' }} />
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin="20"
          style={{ padding: '70px 0px' }}
        >
          {listingBundle}
        </Box>
      </Box>
    </>
  );
}
