import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { setLocation } from "../mainSlice";

export default function GetLocation() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [inputInvalid, setInputInvalid] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setInputInvalid(false);
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault(); // prevent page reload on submit
    const zip = e.target[0].value;
    fetch("/api/setCenter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zip: zip }),
    })
      .then((data) => data.json()) // data = {lat, lng}
      .then((data) => dispatch(setLocation({ zip, ...data })))
      .catch(() => console.log("Could not get coordinates."));
  };

  const checkZipCode = (e) => {
    // PROTIP FROM ROBIN: testID as an id for testing purposes, not data-testId
    if (e.target.value.length === 0) setInputInvalid(false);
    if (!parseInt(e.target.value) || e.target.value.length !== 5) {
      setInputInvalid(true);
      setButtonDisabled(true);
    } else {
      setInputInvalid(false);
      setButtonDisabled(false);
    }
  };

  // PROTIP FROM ROBIN:
  // testID as an id for testing purposes, not data-testId

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      component="form"
      onSubmit={formSubmit}
    >
      <Typography variant="h2" textAlign={"center"} sx={{ margin: "10px" }}>
        Swoop <br /> NYC
      </Typography>
      <TextField
        id="zipCodeInput"
        label="Enter Your Zip Code"
        name="entryText"
        sx={{ margin: "10px", textAlign: "center" }}
        error={inputInvalid}
        onChange={(e) => checkZipCode(e)}
      ></TextField>
      <Button
        id="zipCodeSubmit"
        variant="outlined"
        sx={{ margin: "10px" }}
        disabled={buttonDisabled}
        onClick={(e) => {
          dispatchLocation(e);
        }}
      >
        Swoop!
      </Button>
    </Box>
  );
}
