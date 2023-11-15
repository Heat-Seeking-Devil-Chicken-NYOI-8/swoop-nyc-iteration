//importing react and provider
import React from "react";
import { Provider } from 'react-redux';
// importing components from app.
import App from '../../src/App.jsx';
import store from '../../src/store.js';
import { setLocation } from "../mainSlice";
import GetLocation from "../../src/components/GetLocation.jsx";
// importing MUI components within each redux component and other testing modules
import { Box, TextField, Button, Typography } from "@mui/material";
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';


describe('GetLocation', () => {




})