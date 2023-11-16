import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { setLocation } from "../mainSlice";

export default function GetLocation() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [inputInvalid, setInputInvalid] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    setInputInvalid(false)
  }, [])

  const dispatchLocation = async (e) => {
    // target the input field above the button and get the value.
    const zipCode = e.target.previousSibling.lastChild.childNodes[0].value;
    // const response = await fetch('/api/setCenter', {
    //   method: 'POST',
    //   body: { zip: zipCode }
    // })
    // const data = await response.json();
    // console.log(data);

    // console.log(typeof zipCode)
    dispatch(setLocation({ zip: 10023, lat: 40.777, lng: -73.981 }));
  }

  const checkZipCode = (e) => {
    if (e.target.value.length === 0) setInputInvalid(false)
    if (!parseInt(e.target.value) || e.target.value.length !== 5) {
      setInputInvalid(true);
      setButtonDisabled(true)
    }
    else {
      setInputInvalid(false)
      setButtonDisabled(false)
    };
  }

  // PROTIP FROM ROBIN:
  // testID as an id for testing purposes, not data-testId

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" textAlign={"center"} sx={{ margin: "10px" }}>Swoop <br /> NYC</Typography>
      <TextField
        id="zipCodeInput"
        label="Enter Your Zip Code"
        sx={{ margin: "10px", textAlign: "center" }}
        error={inputInvalid}
        onChange={(e) => checkZipCode(e)}></TextField>
      <Button id="zipCodeSubmit" variant="outlined" sx={{ margin: "10px" }} disabled={buttonDisabled} onClick={(e) => { dispatchLocation(e) }}>Swoop!</Button>
    </Box >

  );
}
