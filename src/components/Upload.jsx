import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavPosition, savePhoto } from "../mainSlice";
import { Box, Typography, Button, Icon, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Upgrade } from "@mui/icons-material";
import { createClient } from "@supabase/supabase-js";
import exifr from "exifr";

export default function Upload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileName = Math.trunc(10 ** 6 * Math.random()) + file.name;

    dispatch(savePhoto({fileName, file}));
    navigate("/previewlisting");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        component="label"
        sx={{
          border: "5px dotted #ccc",
          minHeight: "82vh",
          minWidth: "83vw",
          marginTop: "5vh",
          marginX: "5vw",
          color: "#999",
        }}
      >
        <Input
          type="file"
          id="file"
          name="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          style={{
            width: "1",
            height: "1",
            marginTop: "3vh",
            marginX: "5vw",
            marginBottom: "6vh",
            visibility: "hidden",
            zIndex: "2",
            position: "absolute",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Upgrade sx={{ fontSize: "20vw", maxBlockSize: "130px" }} />
          <br />
          <Typography
            variant="body2"
            textAlign="center"
            fontSize={"8vw"}
            maxBlockSize="180px"
          >
            Upload
            <br />
            Photo
          </Typography>
          <br />
        </Box>
      </Button>
    </Box>
  );
}
