import {configureStore} from '@reduxjs/toolkit'
import swoopSlice from './reducers/swoopSlice.js'

const store = configureStore({
    devTools: true,
    reducer: {
        swoop: swoopSlice
    }
});

export default store;