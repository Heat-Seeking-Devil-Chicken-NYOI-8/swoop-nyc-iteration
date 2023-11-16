const express = require('express');
const listingController = require('../Controllers/listingController');
const cookieController = require('../Controllers/cookieController')
const router = express.Router();

//recieves an array [lat,lng] and sends back an array of listing objects
//based on distance
router.post('/', listingController.getListings, cookieController.setCookie, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
