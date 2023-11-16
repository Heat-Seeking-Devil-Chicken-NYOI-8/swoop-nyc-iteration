import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box, Typography, Button, Icon } from "@mui/material";
import { Upgrade } from "@mui/icons-material";
import { createClient } from "@supabase/supabase-js";

export default function Upload() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  // const supabaseUrl = "https://iqmxeqilgrwqfrwxzqfz.supabase.co";
  // const supabaseKey = process.env.REACT_APP_SUPABASE;
  // const supabase = createClient(supabaseUrl, supabaseKey);

  // const url = async(image)
  //   //add image to supabase and get the URL back, add the URL to the request body
  //   try{
  //     //upload image
  //     const {data, error} = await supabase
  //       .storage
  //       .from('item-image')
  //       .upload(item.image.name, item.image)

  //     //get the url from the uploaded image
  //     const imageUrl = await supabase
  //       .storage
  //       .from('item-image')
  //       .getPublicUrl(item.image.name)

  //       //update value of item.image to the string of the url
  //       item.image = imageUrl.data.publicUrl;
  //       console.log('data received from image upload', imageUrl.data.publicUrl);
  //   } catch (err) {console.log(err);}

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
        <Box paddingBottom={"5%"}>
          <Upgrade sx={{ fontSize: "20vw", maxBlockSize: "130px" }}></Upgrade>
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
        </Box>
      </Button>
    </Box>
  );
}
