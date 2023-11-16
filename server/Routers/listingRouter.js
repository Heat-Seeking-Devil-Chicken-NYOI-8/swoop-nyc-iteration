const express = require('express');
const listingController = require('../Controllers/listingController');
const router = express.Router();

//recieves an array [lat,lng] and sends back an array of listing objects
//based on distance
router.post('/', listingController.getListings, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
