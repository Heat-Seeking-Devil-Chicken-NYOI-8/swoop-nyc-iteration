import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function PreviewListing() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

return (
  <>
    <Box 
    display="flex" 
    flexDirection ="column" 
    justifyContent="center"
    textAlign="center"
    alignItems="center"
    padding ="50px"
    >

    <Box display="flex" 
    alignContent="center"
    >
    <img src= "https://i.imgur.com/f7VXJQF.jpeg" width="100%"/>
    </Box>

    <Box display="flex" marginTop = "10px" marginBottom="10px">
      <Stack direction="row" spacing={1}>
        <Chip label="Chair" sx={{width: "100px"}} />
        <Chip label="Blue" sx={{width: "100px"}} />
        <Chip label="Big chair" sx={{width: "100px"}} />
        <Chip label="Blue chair" sx={{width: "100px"}}/>
        </Stack>
    </Box>


    <Box marginTop = "10px" marginBottom="10px" paddingLeft = "2">
      <p> 
        <Typography variant="body2">
          hi this is the description of the item that is listed above bcvdhjfzkbvx,cnjmnvdjf,nslac.masKXLs;ajefrkghjlsbd.nv zmxc,bvskdjfhzdcskafielrsurbhjvdfjn.cskmdlwejiflshugv n vbhdjcnjkdsjvbgvjnkdewjruhvjnfvbckjdf vhgkbj,nk.bhjvghcfgdxsrftyguhbhvgfcfvbn, 
          </Typography>
      </p>
    </Box>

    <Box display="flex" flexDirection = "row" alignContent="space-between" padding ="10px"> 
      <Button variant = "contained" size="small" sx= {{margin: "3px"}}>Cancel</Button>
      <Button variant = "contained" size="small" sx= {{margin: "3px"}}>Post</Button>
    </Box>

  </Box>
  </>
  )
}