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


export default function PreviewListing() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

// return (
//   <>
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         component="img"
//         alt="green iguana"
//         height="140"
//         image="/static/images/cards/contemplative-reptile.jpg"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Blue chair
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           This is a description paragraph about blue chair
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button variant = "contained" size="small">Cancel</Button>
//         <Button variant = "contained" size="small">Post</Button>
//       </CardActions>
//     </Card>
//   );
//   </>
//   )
// }

//or using boxes:
//textalign center


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

    <Box display="flex" marginTop = "10px" marginBottom="10px">
       //image
    </Box>

    <Box display="flex" marginTop = "10px" marginBottom="10px">
        //tags
    </Box>


    <Box display="flex" marginTop = "10px" marginBottom="10px">
      <p> 
        <Typography variant="body2">
          //description
          </Typography>
      </p>
    </Box>

    <Box display="flex" padding ="10px"> 
      <Button variant = "contained" size="small">Cancel</Button>
      <Button variant = "contained" size="small">Post</Button>
    </Box>

  </Box>
  </>
  )
}