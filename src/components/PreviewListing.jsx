import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
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

export default function PreviewListing() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        padding="0 50"
      >
        <br />
        <Typography variant="h5">Preview Listing</Typography>
        <br />
        <Box alignContent="center">
          <img className="squareImg" src={state.newListingPhoto.url} />
        </Box>

        <Box margin="10 0">
          <Chip label="Chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Big chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue chair" sx={{ padding: "0 5", margin: "5" }} />
          <Chip label="Blue" sx={{ padding: "0 5", margin: "5" }} />
        </Box>

        <Box
          flexWrap="wrap"
          marginTop="10px"
          marginBottom="10px"
          paddingLeft="2"
        >
          <Typography variant="body2">
            hi this is the description of the item that is listed above
            bcvdhjfzkbvx,cnjmnvdjf,nslac.masKXLs;ajefrkghjlsbd.nv
            zmxc,bvskdjfhzdcskafielrsurbhjvdfjn.cskmdlwejiflshugv n
            vbhdjcnjkdsjvbgvjnkdewjruhvjnfvbckjdf
            vhgkbj,nk.bhjvghcfgdxsrftyguhbhvgfcfvbn,
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
          >
            Post
          </Button>
        </Box>
      </Box>
    </>
  );
}
