import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";

export default function GetLocation() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" textAlign={"center"} sx={{ margin: "10px" }}>
        Swoop <br /> NYC
      </Typography>
      <TextField
        label="Enter Your Zip Code"
        sx={{ margin: "10px" }}
      ></TextField>
      <Button variant="outlined" sx={{ margin: "10px" }}>
        Swoop!
      </Button>
    </Box>
  );
}
