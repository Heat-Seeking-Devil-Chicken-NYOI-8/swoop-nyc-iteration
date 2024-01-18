const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const path = require('path');

// parse JSON from incoming requests
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

/****************************ROUTER IMPORT******************************************* */
const googleMapsRouter = require('./Routers/googleMapsRouter.js');
const listingRouter = require('./Routers/listingRouter.js');

/***********************HANDLING STATIC FILES********************************************* */
// handle requests from static files
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/map', (req, res) => {
  res.redirect('/');
});
// route handler to respond with main app
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

/******************************ACTIONS**************************************** */
// handle API calls
app.use('/api', googleMapsRouter);
app.use('/listing', listingRouter);
app.use('/photos', listingRouter);

/********************************404 HANDLING********************************************** */
// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

/*********************************GLOBAL ERROR HANDLER************************************** */
// global error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// initialize port listening
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
