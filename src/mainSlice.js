import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        location: {
            zip: '',
            lat: '',
            lng: '',
        },
        listings: [], // [{_id, creation_date, url, lat, lng, tags =[], description, flag}, ...]
        newListing: {}, // {_id, creation_date, description,...}
        newListingPhoto: {}, // {url, lat, lng}
        activeListing: '', // _id
        searchInput: '',
        activeButton: 'Browse'
    },
    reducers: {
        setLocation: (state, action) => { // payload: { zip, lat, lng }
            state.location = action.payload;
        },
        savePhoto: (state, action) => { // payload: { url, lat, lng }
            state.newListingPhoto = action.payload;
        },
        addNewListing: (state, action) => { // payload: { _id, creation_date, url, lat, lng, tags, description, flag }
            state.listings.push(action.payload);
        },
        setListings: (state, action) => { // payload: [{same format as addNew Listing}, {},...]
            state.listings = action.payload;
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
    setLocation,
    savePhoto,
    addNewListing,
    setListings,
    setActiveListing,
    removeListing,
    setSearchInput,
} = mainSlice.actions;

// Export the reducer function for store configuration
export default mainSlice.reducer;