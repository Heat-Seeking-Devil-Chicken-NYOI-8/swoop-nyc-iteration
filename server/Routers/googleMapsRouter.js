const express = require('express');
const googleMapsController = require('../Controllers/googleMapsController');
//const listingController = require('../Controllers/listingController');
const cookieController = require('../Controllers/cookieController')
const router = express.Router();

//gets zip code {"zip": } and sends back coordinates {lat:, lng:}
router.post(
  '/setCenter',
  googleMapsController.getCoordinatesFromZip,
  cookieController.setCookie,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;
