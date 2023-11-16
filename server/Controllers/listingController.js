const db = require('../model.js');
const listingController = {};


listingController.getListings = async (req, res, next) => {
  const query = 'SELECT * FROM listings'; // TO DO: return [{_id, creation_date, description, tags = [], url, lat, lng, flag}, ...]
  try {
    const data = await db.query(query);
    res.locals.data = data;
    next();
  } catch (e) {
    next({
      log: `controller.getListing: ${e}`,
      status: 500,
      message: { err: 'An error occurred. See log for details.' },
    });
  }
};

listingController.addListing = async (req, res, next) => {
  console.log(req.body);
  const { url, lat, lng, tags, description } = req.body;
  try {
    const query = 'INSERT INTO listings (url, lat, lng, description, flag) VALUES ($1, $2, $3, $4, $5) RETURNING _id, creation_date';
    const data = await db.query(query, [url, lat, lng, description, false]);
    res.locals.data = data.rows[0]; // {_id, creation_date}
    tags.forEach(async tag => {
      const query = 'INSERT INTO tags (tag, listing_id) VALUES ($1, $2)';
      const data = await db.query(query, [tag, res.locals.data._id]);
    })
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
