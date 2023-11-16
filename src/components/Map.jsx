import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setNavPosition, initializeListings } from '../mainSlice';
import { Box } from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader';
import ListingPopUp from './ListingPopUp.jsx';
import PreviewListing from './PreviewListing.jsx';
import { store } from '../store.js';
import { useNavigate } from 'react-router-dom';

export default function Map() {
  /****************************************STATES******************************************* */
  const [map, setMap] = useState(null); // State to hold the map instance
  const [center, setCenter] = useState([]); //State to hold the current center as an array [lat,lng]

  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let markerList = [];
  /**************************************USE EFFECT***************************************** */
  //Set-up initial map of first render
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADQU5Oic0aAZjytCZzVbo8MZOQSgNPqA4',
      version: 'weekly',
    });
    // Load the Google Maps API library
    loader.importLibrary('core', 'geometry', 'places').then(() => {
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
      //replace the search bar with the google maps places api searchbar
      console.log(google.maps);
      // const mapSearch = new google.maps.places.SearchBox(
      //   document.getElementById('location')
      // );
      setMap(newMap);

      // mapSearch.addListener('places_changed', () =>
      //   console.log(mapSearch.getPlaces())
      // );
    });
  }, []);

  //update the listings based on location
  useEffect(() => {
    //setup code
    //throttling the fetch request
    let timeID = setTimeout(fetchListings, 500);
    //cleanupCode:
    return () => {
      clearTimeout(timeID);
    };
  }, [center]);
  /****************************HANDLER FUNCTIONS************************************ */
  function fetchListings() {
    console.log('wait');
    while (markerList.length != 0) {
      markerList.pop().setMap(null);
    }
    fetch('/listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(center),
    })
      //data to get back should be an array of objects {name:, lat:, lng}
      .then((data) => data.json())
      .catch(() => console.log('i failed here'))
      .then((data) => {
        console.log(data.rows);
        data.rows.forEach((el) => {
          initializeListings(data);
          addMarker(el.description, el.lat, el.lng, el.url, el._id, map);
        });
      })
      .catch(() => console.log('error setting markers'));
  }
  //Create a random marker on the map
  //@Params {string} - name : decription of listing
  //@Params {number} - lat, lng : latitude and longitude of maker
  //@Params {string} -url
  //@Params {map} -  map : google maps object to place marker on
  function addMarker(name, lat, lng, url, _id, map) {
    const newMarker = new google.maps.Marker({
      position: { lat: parseFloat(lat), lng: parseFloat(lng) },
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
      ReactDOM.render(
        <Provider store={store}>
          <ListingPopUp name={name} url={url} _id={_id} />
        </Provider>,
        tempdiv
      );
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
  //@params {event} - e : form event
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
        <input id="location" type="text" name="zip" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
