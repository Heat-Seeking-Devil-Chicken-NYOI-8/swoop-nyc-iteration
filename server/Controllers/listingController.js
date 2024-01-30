const db = require('../Models/PGmodel.js');
const supabase = require('../Models/SupabaseModel.js');
const listingController = {};

//get all the available listings
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

//add a listing
listingController.addListing = async (req, res, next) => {
  console.log(req.body);
  const { url, lat, lng, tags, description } = req.body;
  const query =
    'INSERT INTO listings (url, lat, lng, description, flag) VALUES ($1, $2, $3, $4, $5) RETURNING (_id, creation_date)'; // TO DO: return {_id, creation_date}
  try {
    const data = await db.query(query, [url, lat, lng, description, false]);
    res.locals.data = data.rows;
    next();
  } catch (e) {
    next({
      log: `controller.addListing: ${e}`,
      status: 500,
      message: { err: 'An error occurred. See log for details.' },
    });
  }
};

//upload the image to supabase
listingController.addPhoto = async (req, res, next) => {
  console.log(req.file);
  const file  = req.file;
  const fileName = Math.trunc(10 ** 6 * Math.random()) + 'help';

  try {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file);
      console.log(data)
    // res.locals.url = await supabase.storage
    //   .from('swoop')
    //   .getPublicUrl(fileName).data.publicUrl;
    // console.log(res.locals.url);
    next();
    //let { latitude, longitude } = await exifr.gps(file);
  } catch (e) {
    next({
      log: `controller.addphoto: ${e}`,
      status: 500,
      message: { err: 'An error occurred. See log for details.' },
    });
  }
};

// Export the controller object
module.exports = listingController;
