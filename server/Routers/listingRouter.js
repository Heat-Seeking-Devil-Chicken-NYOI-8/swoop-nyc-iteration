const express = require('express');
const multer = require('multer');

const listingController = require('../Controllers/listingController');
const cookieController = require('../Controllers/cookieController');
const router = express.Router();

// storing the image files in memory. Memory storage > disk storage
const upload = multer({
  storage: multer.memoryStorage(),
});

//recieves an array [lat,lng] and sends back an array of listing objects
//based on distance
router.get('/', listingController.getListings, (req, res) => {
  return res.status(200).json(res.locals.data);
});

//add a listing -> (file) -> add to supabase -> get coodinates -> return S3 URL and coordinates
//{url: "" , coor: {lat:"", lng:""}}
router.post(
  '/',
  upload.single('file'),
  listingController.addPhoto,
  listingController.getCoor,
  (req, res) => {
    console.log('res.locals', res.locals);
    return res.status(200).json(res.locals);
  }
);

router.delete('/', listingController.deletePhoto, (req, res)=>{
  return res.status(200).send('deleted')
})

module.exports = router;
