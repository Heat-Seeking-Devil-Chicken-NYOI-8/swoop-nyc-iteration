import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavPosition } from "../mainSlice";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import FlagIcon from "@mui/icons-material/Flag";
import Paper from "@mui/material/Paper";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";
import Face6Icon from "@mui/icons-material/Face6";
import Face2Icon from "@mui/icons-material/Face2";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

export default function ViewListing() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        padding="0 50"
        marginBottom={"50"}
      >
        <Box
          display="flex"
          textAlign="left"
          alignItems="flexStart"
          sx={{ margin: "20" }}
        >
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceOutlinedIcon />}
            size="small"
            sx={{ marginRight: "230" }}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </Box>
        <Box alignContent="center">
          <img className="squareImg" src="https://i.imgur.com/f7VXJQF.jpeg" />
        </Box>

        <Box margin="10 0">
          <Chip label="Chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Big chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue" sx={{ padding: "0 5", margin: "5" }} />
        </Box>

        <Box display="flex" flexWrap="wrap" padding="10 0">
          <Typography variant="body1" color="inherit" component="div">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignContent="space-between"
          padding="10px"
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              margin: "0 10 20 10",
              padding: "10 20",
              backgroundColor: "red",
            }}
          >
            Mark as Taken
          </Button>
        </Box>
      </Box>
    </>
  );
}
