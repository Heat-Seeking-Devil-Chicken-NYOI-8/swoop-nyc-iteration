import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavPosition } from "../mainSlice";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Chip from "@mui/material/Chip";

export default function Browse() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const listingBundle = [];
  for (let i = 0; i < 10; i++) {
    listingBundle.push(
      <Paper sx={{ marginBottom: "20" }}>
        <Box display="flex" onClick={() => navigate("/viewlisting")}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Box sx={{ backgroundColor: "#eee" }}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsOpen(true)}
            >
              <FilterAltIcon />
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

            <Typography variant="h6" color="inherit" component="div">
              Browse Listings
            </Typography>
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
