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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const listingBundle = [];
  for (let i = 0; i < listings.length; i++) {
    listingBundle.push(<BrowseItem key={listings[i]._id} listing={listings[i]} />);
  }
  /************ Populating tags ***************/
  // declare fnc getTags to pull tags from listings (mock listings for now)
  // const getTags = (listings) => {
  //   // initialize a Obj to hold tags.
  //   const output = {};
  //   // iterate through tags in each item, adding all tags to the set before returning the set.
  //   for (let item of listings) {
  //     for (let tag of item.tags) {
  //       if (!output[tag]) {
  //         output[tag] = 1;
  //       } else output[tag]++;
  //     }
  //   }
  //   // console.log(output)
  //   return output;
  // };
  // const mockTagsObj = getTags(state.listings);
  // // array of tags
  // const mockTags = Object.keys(mockTagsObj);

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
  // const tagListItems = [];

  // const populateTagList = (listOfTags) => {
  //   for (let tag of listOfTags) {
  //     tagListItems.push(
  //       <ListItemButton>
  //         <ListItemText primary={`${tag[0]} (${tag[1]})`} />
  //       </ListItemButton>
  //     );
  //   }
  // };
  // populateTagList(sortTags(mockTagsObj));

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
            {/* <Drawer
              anchor="left"
              size="sm"
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <List>{tagListItems}</List>
            </Drawer> */}
            {/* <Autocomplete
              multiple
              id="search-tags"
              options={mockTags}
              freeSolo
              renderTags={(value, getTagProps) => {
                // console.log(value)
                // console.log(getTagProps)
                return value.map((option, index) => {
                  console.log('map: option, index', option, index);
                  return (
                    <Chip
                      variant="filled"
                      label={option}
                      {...getTagProps({ index })}
                      size="small"
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
            /> */}
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
