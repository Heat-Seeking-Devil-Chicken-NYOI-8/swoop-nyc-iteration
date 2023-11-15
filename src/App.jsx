import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);

  return <Box>Hello world!</Box>;
}
