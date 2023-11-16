import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        navPosition: 'Browse', // 'Browse' or 'Upload' or 'Map'
        location: { zip: '10001', lat: 40.713050, lng: -74.007230 }, // {zip, lat, lng}
        listings: [], // [{_id, creation_date, url, lat, lng, tags =[], description, flag}, ...]
        newListingPhoto: { url: 'https://iqmxeqilgrwqfrwxzqfz.supabase.co/storage/v1/object/public/images/985688IMG_2910.JPG', lat: 40.713050, lng: -74.007230 }, // {url, lat, lng}
        activeListing: '', // _id
        searchInput: '', // current text in search box
    },
    reducers: {
        setNavPosition: (state, action) => { // payload: 'Browse' or 'Upload' or 'Map'
            state.navPosition = action.payload;
        },
        setLocation: (state, action) => { // payload: { zip, lat, lng }
            state.location = action.payload;
        },
        savePhoto: (state, action) => { // payload: { url, lat, lng }
            state.newListingPhoto = action.payload;
        },
        initializeListings: (state, action) => { // payload: [{same format as addNew Listing}, {},...]
            state.listings = action.payload;
        },
        addNewListing: (state, action) => { // payload: { _id, creation_date, url, lat, lng, tags, description, flag }
            state.listings.push(action.payload);
        },
        setActiveListing: (state, action) => { // payload = _id
            state.activeListing = action.payload;
        },
        removeListing: (state, action) => { // payload = _id
            state.listings = state.listings.filter(listing => listing._id !== action.payload);
        },
        setSearchInput: (state, action) => { // payload = 'string'
            state.searchInput = action.payload;
        },
    },
});

// Export actions for use in components
export const {
    setNavPosition,
    setLocation,
    savePhoto,
    initializeListings,
    addNewListing,
    setActiveListing,
    removeListing,
    setSearchInput,
} = mainSlice.actions;

// Export the reducer function for store configuration
export default mainSlice.reducer;