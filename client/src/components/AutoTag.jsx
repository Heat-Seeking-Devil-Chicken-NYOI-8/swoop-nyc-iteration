import React, { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"


export default function AutoTag(props) {

  let tags;
  const { setSelectedTags, placeholderText } = props;
  if (!props.tags) tags = {};
  else tags = props.tags;

  return (
    <Autocomplete
      multiple
      id="search-tags"
      options={Object.keys(tags)}
      freeSolo
      onChange={(e, value) => { setSelectedTags(value) }}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => {
          console.log('AutoTag/rendertags: option, index', option, index);
          return (
            <Chip
              variant="filled"
              label={option}
              {...getTagProps({ index })}
              size="medium"
            />
          );
        });
      }}
      renderInput={(params) => {
        // console.log("renderInput params: ", params)
        return (
          <TextField
            {...params}
            variant="filled"
            placeholder={`${placeholderText}`}
            size="small"
          />
        );
      }}
      sx={{
        backgroundColor: '#eee',
        padding: '10px',
        width: '100%;',
        display: "flex",
      }}
      size="small"
    />
  )

}