const db = require('../model.js');
const listingController = {};

// const coordinates = [
//   { name: 'Times Square', lat: 40.758896, lng: -73.98513 }, // Times Square
//   { name: 'Central Park', lat: 40.785091, lng: -73.968285 }, // Central Park
//   { name: 'Statue of Liberty', lat: 40.689247, lng: -74.044502 }, // Statue of Liberty
//   { name: 'Empire State Building', lat: 40.748817, lng: -73.985428 }, // Empire State Building
//   { name: 'Brooklyn Bridge', lat: 40.706086, lng: -73.996864 }, // Brooklyn Bridge
// ];

listingController.getListings = (req, res, next) => {
  const query = '';
  try {
    res.locals.data = rows; // [{_id, creation_date, description, tags = [], url, lat, lng, flag}, ...]
    return next();
  } catch (e) {
    return next({
      log: `controller.getListings: ${e}`,
      status: 500,
      message: { err: 'An error occurred. See log for details.' },
    });
  }
};

listingController.addListing = async (req, res, next) => {
  console.log(req.body)
  const { url, lat, lng, tags, description } = req.body;
  const query = 'INSERT INTO listings (url, lat, lng, description, flag) VALUES ($1, $2, $3, $4, $5) RETURNING _id, creation_date';
  try {
    const data = await db.query(query, [url, lat, lng, description, false]);
    res.locals.data = data.rows[0]; // {_id, creation_date}
    next();
  } catch (e) {
    next({
      log: `controller.addListing: ${e}`,
      status: 500,
      message: { err: 'An error occurred. See log for details.' },
    });
  }
};

// Export the controller object
module.exports = listingController;
