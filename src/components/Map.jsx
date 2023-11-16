import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNavPosition } from '../mainSlice';
import { Box } from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader';
import { link } from 'react-router-dom';
import ListingPopUp from './ListingPopUp.jsx';

export default function Map() {
  /****************************************STATES******************************************* */
  const [map, setMap] = useState(null); // State to hold the map instance
  const [zip, setZip] = useState('');

  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  /**************************************USE EFFECT***************************************** */
  //Set-up initial map of first render
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADQU5Oic0aAZjytCZzVbo8MZOQSgNPqA4',
      version: 'weekly',
    });
    // Load the Google Maps API library
    loader.importLibrary('core').then(() => {
      // Initialize the map on a DOM element with id of 'map' that is created on first render
      const newMap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.75368539999999, lng: -73.9991637 },
        zoom: 12,
      });
      //store the map as a state so it can be referenced outside
      setMap(newMap);
    });
  }, []);

  /****************************HANDLER FUNCTIONS************************************ */
  //Create a random marker on the map
  function addMarker() {
    const x = Math.random() * 180 - 90;
    const y = Math.random() * 360 - 180;
    const newMarker = new google.maps.Marker({
      //position: { lat: x, lng: y },
      position: { lat: 40.75368539999999, lng: -73.9991637 },
      map: map,
    });

    const infowindow = new google.maps.InfoWindow({
      //content: '<a href="http://google.com">help</a>',
      //content: `<ListingPopUp />`,
    });

    newMarker.addListener('click', () => {
      //create an empty div to be put into the infowindow
      const tempdiv = document.createElement('div');
      //ReactDOM.render(<ListingPopUp />, tempdiv);
      ReactDOM.render(<ListingPopUp />, tempdiv);
      infowindow.setContent(tempdiv);

      infowindow.open({
        anchor: newMarker,
        map: map,
      });
    });
  }

  //Send zip to back end to recenter map
  function zipCenter(e) {
    e.preventDefault();
    fetch('/api/setCenter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zip: zip }),
    })
      //expected data to be {lon: , lat:}
      .then((data) => data.json())
      .then((data) => {
        map.setCenter(data);
      })
      .catch(() => console.log('could not set center'));
  }
  /***********************************RENDER COMPONENT************************************** */
  return (
    <div>
      <div id="map" style={{ height: '80vh', width: '100%' }}></div>
      <button onClick={addMarker} style={{ border: '1px solid red' }}>
        add
      </button>
      <form name="myForm" onSubmit={(e) => zipCenter(e)} method="POST">
        <input
          type="text"
          name="zip"
          onChange={(e) => setZip(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
