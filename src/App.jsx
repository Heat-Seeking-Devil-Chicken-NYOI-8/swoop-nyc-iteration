import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction, Container } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ViewListIcon from "@mui/icons-material/ViewList";
import PlaceIcon from "@mui/icons-material/Place";
import Browse from "./components/Browse";
import GetLocation from "./components/GetLocation";
import Map from "./components/Map";
import PreviewListing from "./components/PreviewListing";
import Upload from "./components/Upload";
import ViewListing from "./components/ViewListing";
import { setNavPosition } from "./mainSlice";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);

  // if (!state.location)
  //   return (
  //     <Box>
  //       <GetLocation />
  //     </Box>
  //   );
  // else
  return (
    <Router>

      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* <Container> */}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/map" element={<Map />} />
            <Route path="/previewlisting" element={<PreviewListing />} />
            <Route path="/viewlisting" element={<ViewListing />} />
          </Routes>
        </Box>
        {/* </Container> */}
        <BottomNavigation
          showLabels
          value={state.navPosition}
          onChange={(event, newPosition) => {
            dispatch(setNavPosition(newPosition));
          }}
          sx={{ width: "100%", position: "fixed", bottom: 0 }}
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
      </Box>
    </Router>
  );
}
