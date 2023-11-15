import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Browse() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return (
    <Box>
      <Box>
        <TextField></TextField>
        <Button></Button>
      </Box>
      {/* Just for development */}
      <Link to="/upload">Upload</Link>
    </Box>


  );
}
