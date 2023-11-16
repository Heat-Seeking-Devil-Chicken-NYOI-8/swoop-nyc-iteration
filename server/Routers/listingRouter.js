const express = require('express');
const listingController = require('../Controllers/googleMapsController');
const router = express.Router();

//recieves an array [lat,lng]sends back an array of of objects {name: , lat:, lng:}
router.get(
  '/get',
  listingController.getListings,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;
