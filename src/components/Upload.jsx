import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, Typography, Button, Icon } from "@mui/material";
import { Upgrade } from "@mui/icons-material"

export default function Upload() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Button sx={{
        border: "1px dotted darkGray",
        minHeight: "82vh", minWidth: "83vw", marginTop: "3vh", marginX: "5vw", marginBottom: "6vh"
      }}>
        <Box paddingBottom={"5%"}>
          <Upgrade sx={{ fontSize: "20vw", maxBlockSize: "130px", color: "#EEE" }} ></Upgrade>
          <br />
          <Typography color="#EEE" variant="body2" textAlign="center" fontSize={"8vw"} maxBlockSize="180px">Click to Upload Photo</Typography>
        </Box>
      </Button >
    </Box >


  );
}
