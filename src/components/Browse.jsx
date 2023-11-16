import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavPosition } from "../mainSlice";
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
  Paper,
  Autocomplete
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from '@mui/icons-material/Search';
import Chip from "@mui/material/Chip";


export default function Browse() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const listings = state.listings;

  const listingBundle = [];
  for (let i = 0; i < listings.length; i++) {
    listingBundle.push(
      <Paper sx={{ marginBottom: "20" }}>
        <Box display="flex" onClick={() => navigate("/viewlisting")}>
          <Box padding="10" flex="0 0 auto" width="33%">
            <img
              className="squareImg"
              src={listings[i].url}
            />
          </Box>
          <Box
            padding="10"
            flex="1"
            fontSize="20"
            height="120px"
            overflow={"hidden"}
            sx={{
              maskImage:
                "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)",
            }}
          >
            <Typography variant="body2" color="green" component="div">
              ● 0.3 mi away
            </Typography>
            {/* <Chip label="0.3 mi away" size="small" /> */}
            <Typography variant="body1" color="inherit" component="div">
              {listings[i].description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }
  /************ Populating tags ***************/
  // declare fnc getTags to pull tags from listings (mock listings for now)
  const getTags = (listings) => {
    // initialize a Set to hold tags.
    const output = new Set()
    // iterate through tags in each item, adding all tags to the set before returning the set.
    for (let item of listings) {
      for (let tag of item.tags) {
        output.add(tag);
      }
    }
    // console.log(output)
    return output;
  }
  const mockTagsSet = getTags(listings);
  const mockTags = [...mockTagsSet]
  /********************************************/

  /*********** Searching by Tags **************/
  const searchByTags = (listings) => {
    // console.log("hello!")

  }
  /********************************************/


  return (
    <>
      <Box sx={{ backgroundColor: "#eee" }}>
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
              <List>
                <ListItem button component="a" href={""}>
                  <ListItemText primary="Placeholder" />
                </ListItem>
              </List>
            </Drawer>
            <Autocomplete
              multiple
              id="search-tags"
              options={mockTags}
              freeSolo
              renderTags={(value, getTagProps) => {
                // console.log(value)
                // console.log(getTagProps)
                return value.map((option, index) => {
                  console.log("map: option, index", option, index);
                  return <Chip variant="filled" label={option} {...getTagProps({ index })} size="small" />
                })
              }}
              renderInput={(params) => {
                // console.log("renderInput params: ", params)
                return <TextField
                  {...params}
                  variant="filled"
                  placeholder="Search By Tags"
                  size="small"
                />
              }}
              sx={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%;"

              }}
              size="small"
            />
            <SearchIcon sx={{ marginLeft: "3px" }} />
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin="20"
          style={{ padding: "50px 0px" }}
        >
          {listingBundle}
        </Box>
      </Box>
    </>
  );
}
