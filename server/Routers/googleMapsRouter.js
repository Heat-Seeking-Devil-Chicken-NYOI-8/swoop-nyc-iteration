const express = require('express');
const googleMapsController = require('../Controllers/googleMapsController');
const router = express.Router();

//sends back coordinates to center of zip code
router.get(
  '/setZip',
  googleMapsController.getCoordinatesFromZip,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;
