import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store.js';
import App from './App.jsx';
import './style.css';
import CssBaseline from '@mui/material/CssBaseline'

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/* <CssBaseline /> */}
        <App />
    </Provider>
);