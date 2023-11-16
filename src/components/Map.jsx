import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setNavPosition } from '../mainSlice';
import { Box } from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader';
import ListingPopUp from './ListingPopUp.jsx';
import PreviewListing from './PreviewListing.jsx';

const coordinates = [
  [40.758896, -73.98513], // Times Square
  [40.785091, -73.968285], // Central Park
  [40.689247, -74.044502], // Statue of Liberty
  [40.748817, -73.985428], // Empire State Building
  [40.706086, -73.996864], // Brooklyn Bridge
];

export default function Map() {
  /****************************************STATES******************************************* */
  const [map, setMap] = useState(null); // State to hold the map instance
  const [center, setCenter] = useState([]); //State to hold the current center as an array [lat,lng]

  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  let markerList = [];
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
      //set the current center
      setCenter([newMap.getCenter().lat(), newMap.getCenter().lng()]);
      //add a listener to the map to change the center when moving
      newMap.addListener('center_changed', () => {
        setCenter([newMap.getCenter().lat(), newMap.getCenter().lng()]);
      });
      //store the map as a state so it can be referenced outside
      setMap(newMap);
    });
  }, []);

  //update the listings based on location
  const fetchListings = async () => {
    return fetch('/listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([1, 1]),
    });
  };

  useEffect(() => {
    //setup code
    fetchListings()
      //data to get back should be an array of objects {name:, lat:, lng}
      .then((data) => data.json())
      .catch(() => console.log('i failed here'))
      .then((data) => {
        data.forEach((el) => {
          addMarker(el.name, el.lat, el.lng, map);
        });
      })
      .catch(() => console.log('error setting markers'));
    //cleanupCode: removes old markers
    return () => {
      // console.log(`before: ${markerList}`);
      while (markerList.length != 0) {
        markerList.pop().setMap(null);
      }
      // console.log(`after: ${markerList}`);
    };
  }, [center]);
  /****************************HANDLER FUNCTIONS************************************ */
  //Create a random marker on the map
  //@Params {string} - name : decription of listing
  //@Params {number} - lat, lng : latitude and longitude of maker
  //@Params {map} -  map : google maps object to place marker on
  function addMarker(name, lat, lng, map) {
    const newMarker = new google.maps.Marker({
      //position: { lat: x, lng: y },
      position: { lat: lat, lng: lng },
      map: map,
    });

    //create an infowindow to be attached to the specified marker
    const infowindow = new google.maps.InfoWindow({});
    let tempdiv;
    //onclick event of the marker which will open up a listingpopup
    newMarker.addListener('click', () => {
      //create an empty div to be put into the infowindow and store that element in a temporary variable
      tempdiv = document.createElement('div');
      //append the Listingpopup react component to the temporary div
      ReactDOM.render(<ListingPopUp name={name}/>, tempdiv);
      //set the contents of the inforwindow to the div now containing the ListingPopUp
      //infowindow content takes in a string, or a dom element. NOT A REACT COMPONENT
      infowindow.setContent(tempdiv);

      //opens the infowindo and appends it to the marker on the current map
      infowindow.open({
        anchor: newMarker,
        map: map,
      });
    });
    //add event listener to unmount the listing popup to not clutter the dom and end the react component lifecycle
    infowindow.addListener('closeclick', () => {
      console.log('unmounting');
      ReactDOM.unmountComponentAtNode(tempdiv);
    });
    //add the marker to the markerList array for reference to be cleaned up later
    markerList.push(newMarker);
  }

  //Send zip to back end to recenter map
  function zipCenter(e) {
    e.preventDefault();
    //get the zip value from the form
    const zip = e.target[0].value;
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
      <p>
        center is lat:{center[0]} lng:{center[1]}
      </p>
      <form name="myForm" onSubmit={(e) => zipCenter(e)} method="POST">
        <input type="text" name="zip" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
