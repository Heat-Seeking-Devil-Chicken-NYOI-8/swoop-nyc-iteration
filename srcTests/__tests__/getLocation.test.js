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
import { getByDisplayValue, getByRole, getByTestId, render, screen, waitFor } from '@testing-library/react';
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
    // console.log("hello!")
    const header = document.querySelector("h2")
    const zipBox = document.querySelector('#zipCodeInput')
    const submitButton = document.querySelector("#zipCodeSubmit")

    expect(header.textContent).toBe("Swoop  NYC")
    expect(zipBox.nodeName).toBe("INPUT")
    expect(submitButton.textContent).toBe("Swoop!")
  })

  it('Should not accept letters in zip codes', async () => {
    const zipInput = document.querySelector('#zipCodeInput')

    await userEvent.type(zipInput, "a2345")
    expect(zipInput.getAttribute("aria-invalid")).toBe("true")
  })

  it('Should not accept any number other than those with 5 digits', async () => {
    const zipInput = document.querySelector('#zipCodeInput')

    await userEvent.click(zipInput)
    await userEvent.type(zipInput, "123")
    // console.log(zipInput.getAttribute('aria-invalid'))

    expect(zipInput.getAttribute("aria-invalid")).toBe("true")
  })

  it('Should not accept any number other than those with 5 digits', async () => {
    const zipInput = document.querySelector('#zipCodeInput')

    await userEvent.click(zipInput)
    await userEvent.type(zipInput, "12345").then
    // console.log(zipInput.getAttribute('aria-invalid'))


    expect(zipInput.getAttribute("aria-invalid")).toBe("false")
  })

  it('Should not accept any number other than those with 5 digits', async () => {
    const zipInput = document.querySelector('#zipCodeInput')

    await userEvent.click(zipInput)
    await userEvent.type(zipInput, "123456")
    expect(zipInput.getAttribute("aria-invalid")).toBe("true")
  })

})