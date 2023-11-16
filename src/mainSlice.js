import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        navPosition: 'Browse', // 'Browse' or 'Upload' or 'Map'
        location: {}, //{ zip: '10001', lat: 40.713050, lng: -74.007230 }, // {zip, lat, lng}
        listings: [
            { _id: 1, creation_date: '2023-11-09T14:30:00.000Z', url: 'https://i.imgur.com/jYK9TPZ.png', lat: 40.7128, lng: -74.0060, tags: ['table', 'console', 'vintage', 'antique'], description: 'A gently used console table for the kitchen', flag: false },
            { _id: 2, creation_date: "2023-11-11T08:45:00.000Z", url: 'https://i.imgur.com/oZyevFg.png', lat: 40.7306, lng: -73.9352, tags: ['chair', 'modern', 'movable', 'office', 'rolling'], description: 'Adjustable height office chair with a clean, modern design', flag: false },
            { _id: 3, creation_date: "2023-11-13T18:20:00.000Z", url: 'https://i.imgur.com/JhZhiLB.png', lat: 40.7589, lng: -73.9352, tags: ['chairs', 'set', 'modern', 'orange', 'dining room'], description: 'High-backed chairs with bright and cheerful colors to spruce up your dining room', flag: false },
            { _id: 4, creation_date: "2023-11-14T12:10:00.000Z", url: 'https://i.imgur.com/yn7ylQa.png', lat: 40.7589, lng: -73.9851, tags: ['cabinet', 'antique', 'vintage', 'large'], description: 'Pre-war antique cabinet. Porcelain not included.', flag: false },
            { _id: 5, creation_date: "2023-11-15T20:05:00.000Z", url: 'https://i.imgur.com/kHxlJvK.png', lat: 40.7931, lng: -73.9712, tags: ['dresser', 'large', 'storage', 'natural', 'wood'], description: 'Ikea dresser with 6 drawers in a natural wood finish', flag: false }
        ], // [{_id, creation_date, url, lat, lng, tags =[], description, flag}, ...]
        newListingPhoto: {}, // { url: 'https://iqmxeqilgrwqfrwxzqfz.supabase.co/storage/v1/object/public/images/985688IMG_2910.JPG', lat: 40.713050, lng: -74.007230 }, // {url, lat, lng}
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