const express = require('express');
const multer = require('multer');

const listingController = require('../Controllers/listingController');
const cookieController = require('../Controllers/cookieController');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//recieves an array [lat,lng] and sends back an array of listing objects
//based on distance
router.get('/', listingController.getListings, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.post('/', upload.single('file'), (req, res) => {
  console.log('body', req.body);
  return res.status(200).json('res.locals.data');
});

module.exports = router;
