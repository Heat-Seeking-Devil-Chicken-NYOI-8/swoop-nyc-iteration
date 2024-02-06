require('dotenv').config();

const apiKey = process.env.GOOGLE_API;
const googleMapsController = {};

//fetches from googleMaps
googleMapsController.getCoordinatesFromZip = (req, res, next) => {
  const { zip } = req.body;
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      //filters the data to onlt get {lat:, lng:}
      res.locals.data = data.results[0].geometry.location;
      return next();
    })
    .catch(() => {
      return next({
        log: 'could not get coordinates from google',
        status: 400,
        message: { err: 'could not get coordinates' },
      });
    });
};

//filters data based on distance
googleMapsController.distanceSelector = (req, res, next) => {
  //request body is [lat,lng]
  req.body;
  //data is an array of objects {name, lat, lng}
  res.locals.data.filter((el) => el.lat, el.lng);
};

module.exports = googleMapsController;
