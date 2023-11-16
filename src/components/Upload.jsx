import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavPosition, savePhoto } from "../mainSlice";
import { Box, Typography, Button, Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Upgrade } from "@mui/icons-material";
import { createClient } from "@supabase/supabase-js";
import exifr from "exifr";

export default function Upload() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const supabaseUrl = "https://iqmxeqilgrwqfrwxzqfz.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxbXhlcWlsZ3J3cWZyd3h6cWZ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTk3ODcwNSwiZXhwIjoyMDE1NTU0NzA1fQ.mYd_pX1TRRmBIRGkpDCrBr_ezWF1RDSGVCp8rMlXYGo"; //process.env.REACT_APP_SUPABASE;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileName = Math.trunc(10 ** 6 * Math.random()) + file.name;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    const url = await supabase.storage.from("images").getPublicUrl(fileName)
      .data.publicUrl;

    let { latitude, longitude } = await exifr.gps(file);

    dispatch(savePhoto({ url, latitude, longitude }));

    navigate("/previewlisting");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        sx={{
          border: "5px dotted #ccc",
          minHeight: "82vh",
          minWidth: "83vw",
          marginTop: "5vh",
          marginX: "5vw",
          color: "#999",
        }}
      >
        <Box>
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
          <input
            type="file"
            id="file"
            name="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          ></input>
        </Box>
      </Button>
    </Box>
  );
}
