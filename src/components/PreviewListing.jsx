import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition, addNewListing } from "../mainSlice";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Loader } from "@googlemaps/js-api-loader";

export default function PreviewListing() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyADQU5Oic0aAZjytCZzVbo8MZOQSgNPqA4",
      version: "weekly",
    });
    createMap(
      {
        lat: state.newListingPhoto.lat,
        lng: state.newListingPhoto.lng,
      },
      "listingMap",
      loader
    ); // createMap where div id="listingMap"
  }, []);

  async function createMap(center, div, loader) {
    loader.importLibrary("core").then(() => {
      const newMap = new google.maps.Map(document.getElementById(div), {
        center: center, // {lat, lng}
        zoom: 15,
        disableDefaultUI: true,
      });
      //add marker to the newly created map
      const newMarker = new google.maps.Marker({
        position: center, // {lat, lng}
        map: newMap,
      });
    });
  }

  const formSubmit = async (e) => {
    e.preventDefault(); // prevent page reload on submit
    const tags = e.target[0].value.split(" ");
    const description = e.target[2].value;

    const postData = {
      url: state.newListingPhoto.url,
      lat: state.newListingPhoto.lat,
      lng: state.newListingPhoto.lng,
      tags: tags,
      description: description,
    };
    fetch("/api/addListing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((data) => data.json()) // data = {_id, creation_date}
      .then((data) => {
        dispatch(addNewListing({ ...data, ...postData }));
        navigate("/");
      })
      .catch((err) => console.log("Error posting listing: ", err));
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        padding="0 50"
        component="form"
        onSubmit={formSubmit}
      >
        <br />
        <Typography variant="h5">Create Listing</Typography>
        <br />
        <Box alignContent="center">
          <img className="squareImg" src={state.newListingPhoto.url} />
        </Box>

        {/* <Box margin="10 0">
          <Chip label="Chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Big chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue" sx={{ padding: "0 5", margin: "5" }} />
        </Box> */}

        <Box marginTop="20" width="100%">
          <TextField
            multiline
            fullWidth
            required
            id="tags"
            label="Tags (space-separated)"
            name="tags"
            variant="standard"
            // defaultValue="tag1 tag2 tag3 tag4 tag5"
          ></TextField>
        </Box>

        <Box marginTop="20" width="100%">
          <TextField
            multiline
            fullWidth
            required
            id="Description"
            label="Description"
            name="description"
            variant="standard"
            // defaultValue="hi this is the description of the item that is listed above
            // bcvdhjfzkbvx,cnjmnvdjf,nslac.masKXLs;ajefrkghjlsbd.nv
            // zmxc,bvskdjfhzdcskafielrsurbhjvdfjn.cskmdlwejiflshugv n
            // vbhdjcnjkdsjvbgvjnkdewjruhvjnfvbckjdf
            // vhgkbj,nk.bhjvghcfgdxsrftyguhbhvgfcfvbn"
          />
        </Box>

        <Box width="100%" height={"200"} marginTop="30">
          <div id="listingMap" style={{ height: "100%", width: "100%" }}></div>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignContent="space-between"
          padding="10"
          marginTop="20"
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/upload")}
            sx={{
              margin: "0 10 20 10",
              padding: "10",
              width: "100",
              backgroundColor: "#ccc",
              color: "333",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ margin: "0 10 20 10", padding: "10", width: "100" }}
            type="submit"
          >
            Post
          </Button>
        </Box>
      </Box>
    </>
  );
}
