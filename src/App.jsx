import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Box } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);

  if (!state.location) return <Box>GetLocation Component</Box>;
  else return <Box>Browse Component</Box>;
}
