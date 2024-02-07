import React from 'react';
import { setActiveListing } from '../mainSlice';
import { useNavigate, link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../store';

const ListingPopUp = ({listing, clickHandler}) => {
  // const navigate = useNavigate();

  // const state = useSelector((state) => state.main);
  // const dispatch = useDispatch();

  return (
    <div
      className="listingPopUp"
      style={{
        width: '250px',
        height: '250px',
        border: '1px solid red',
      }}
    >
      <b>{listing.description}</b>
      <img
        src={listing.url}
        width="100%"
        onClick={() => clickHandler(listing)}
      ></img>
    </div>
  );
};

export default ListingPopUp;
