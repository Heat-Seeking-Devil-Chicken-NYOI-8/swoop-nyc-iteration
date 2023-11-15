import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { setLocation } from "../mainSlice";

export default function GetLocation() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const dispatchLocation = (e) => {
    // target the input field above the button and get the value.
    const zipCode = e.target.previousSibling.lastChild.childNodes[0].value;
    console.log(zipCode)
    dispatch(setLocation({ zip: 10023, lat: 40.777, lng: -73.981 }));
  }



  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" textAlign={"center"} sx={{ margin: "10px" }}>Swoop <br /> NYC</Typography>
      <TextField label="Enter Your Zip Code" sx={{ margin: "10px", textAlign: "center" }}></TextField>
      <Button variant="outlined" sx={{ margin: "10px" }} onClick={(e) => { dispatchLocation(e) }}>Swoop!</Button>
    </Box >

  );
}