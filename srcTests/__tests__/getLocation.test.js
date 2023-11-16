/**
 * @jest-environment jsdom
 */


//importing react and provider
import React from "react";
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
// importing components from app.
import App from '../../src/App.jsx';
import { store } from "../../src/store.js";
import { setLocation } from "../../src/mainSlice.js";
import GetLocation from "../../src/components/GetLocation.jsx";
// importing MUI components within each redux component and other testing modules
import { Box, TextField, Button, Typography } from "@mui/material";
import userEvent from '@testing-library/user-event'
import { getByDisplayValue, render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';



describe('GetLocation', () => {

  let getLocation;
  const props = { location: null }

  //ARRANGE
  beforeEach(() =>
    getLocation = render(
      <Provider store={store}>
        <GetLocation {...props} />
      </Provider>
    ))

  //ASSERT
  it('Should render correctly', () => {
    console.log("hello!")


  })

  // it('Should only accept 5-digit numbers', () => {


  // })

  // it('Should disappear once a zip code is submitted', async () => {


  // })


})