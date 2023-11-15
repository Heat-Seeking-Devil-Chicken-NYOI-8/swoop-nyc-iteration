const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./model.js');
const controller = require('./controller.js');

// parse JSON from incoming requests
app.use(express.json());

// handle requests from static files
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// handle API calls
app.get('/api/getLatLng', controller.getLatLng, (req, res) => {
    return res.status(200).send(res.locals.data)
})

app.get('/api/getListings', controller.getListings, (req, res) => {
    return res.status(200).send(res.locals.data)
})

app.post('/api/addListing', controller.getData, (req, res) => {
    return res.status(200).send(res.locals.data)
})

// route handler to respond with main app
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

// catch-all route handler for any requests to an unknown route
app.get('*', (req, res) => {
    return res.sendStatus(404);
});

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
