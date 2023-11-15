const db = require('./model.js');

const controller = {};

controller.getLatLng = (req, res, next) => {
    const { zip } = req.body;
    try {
        // TO DO: API call to get {Lat, Lng} from zip
        res.locals.data = { Lat, Lng }
        next();
    } catch (e) {
        next({
            log: `controller.getListings: ${e}`,
            status: 500,
            message: { err: 'An error occurred. See log for details.' },
        });
    }
};

controller.getListings = async (req, res, next) => {
    const query = '' // TO DO: return [{_id, creation_date, description, tags = [], url, lat, lng, flag}, ...]
    try {
        const data = await db.query(query);
        res.locals.data = data.rows;
        next();
    } catch (e) {
        next({
            log: `controller.getListings: ${e}`,
            status: 500,
            message: { err: 'An error occurred. See log for details.' },
        });
    }
};

controller.addListing = async (req, res, next) => {
    const { url, lat, lng, tags, description } = req.body;
    const query = '' // TO DO: return {_id, creation_date}
    try {
        const data = await db.query(query);
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

// Export the controller object
module.exports = controller;