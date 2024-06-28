const db = require('../Models/PGmodel.js');
const supabase = require('../Models/SupabaseModel.js');
const listingController = {};
const exifr = require('exifr');

console.log('entering listingController...')

//get all the available listings
listingController.getListings = async (req, res, next) => {
  // const query = 'SELECT * FROM listings'; // TO DO: return [{_id, creation_date, description, tags = [], url, lat, lng, flag}, ...]
  // try {
  //   const data = await db.query(query);
  //   res.locals.data = data;
  try {
    console.log('listingController/getListings: about to get listings from supabase...')
    let { data: listings, error } = await supabase.from('listings').select('*');
    res.locals.listings = listings
    if (error) throw new Error(error)
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
  // const query =
  //   'INSERT INTO listings (url, lat, lng, description, flag) VALUES ($1, $2, $3, $4, $5) RETURNING (_id, creation_date)'; // TO DO: return {_id, creation_date}
  // try {
  //   const data = await db.query(query, [url, lat, lng, description, false]);
  //   res.locals.data = data.rows;
  //   next();
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([
        { url: url, lat: lat, lng: lng, tags: tags, description: description, flag: true },
      ])
      .select();
    res.locals.data = data;
    if (error) throw error;
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
  //const file = req.file;
  const fileName = `${Date.now()}_help.jpg`;

  try {
    const { data, error } = await supabase.storage
      .from('Swoop')
      .upload(fileName, req.file.buffer, { contentType: 'image/jpeg' });
    console.log(data);
    res.locals.url = await supabase.storage.from('Swoop').getPublicUrl(fileName)
      .data.publicUrl;
    console.log(res.locals.url);
    next();
  } catch (e) {
    next({
      log: `controller.addphoto: ${e}`,
      status: 500,
      message: { err: 'An error occurred. See log for details.' },
    });
  }
};

//delete an image from supabase
listingController.deletePhoto = async (req, res, next) => {
  const { img } = req.params;
  try {
    const { data, error } = await supabase.storage.from('Swoop').remove([img]);
    next();
  } catch {
    (e) => {
      next({
        log: `error in deletephoto`,
        status: 500,
        message: { err: `${e}` },
      });
    };
  }
};

//get the coordinates of the image
listingController.getCoor = async (req, res, next) => {
  try {
    console.log('gettingCoors', res.locals.url);
    let { latitude, longitude } = await exifr.gps(req.file.buffer);
    console.log('coors are', longitude, latitude);
    res.locals.coor = { lat: latitude, lng: longitude };
    next();
  } catch {
    (e) => {
      next({
        log: `controller.getCoor: ${e}`,
        status: 500,
        message: { err: 'could not get coordinates' },
      });
    };
  }
};

// Export the controller object
module.exports = listingController;
