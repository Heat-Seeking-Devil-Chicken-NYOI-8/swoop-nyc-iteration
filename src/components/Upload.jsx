import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, Typography, Button, Icon, Input } from "@mui/material";
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

      <Button component="label" sx={{
        border: "1px dotted darkGray",
        minHeight: "82vh", minWidth: "83vw", marginTop: "3vh", marginX: "5vw", marginBottom: "6vh", zIndex: "0"
      }}>
        <Input type="file" id="uploadInput" style={{ width: "1", height: "1", marginTop: "3vh", marginX: "5vw", marginBottom: "6vh", visibility: "hidden", zIndex: "2", position: "absolute" }} />
        <Box paddingBottom={"5%"} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Upgrade sx={{ fontSize: "20vw", maxBlockSize: "130px", color: "#EEE", justifySelf: "center" }} ></Upgrade>
          <br />
          <Typography color="#EEE" variant="body2" textAlign="center" fontSize={"8vw"} maxBlockSize="180px">Click to Upload Photo</Typography>
        </Box>

      </Button >
    </Box >


  );
}
