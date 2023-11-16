import React from 'react';

const ListingPopUp = ({ name }) => {
  return (
    <div
      className="listingPopUp"
      style={{
        width: '250px',
        height: '250px',
        border: '1px solid red',
        background: 'yellow',
      }}
    >
      <b >{name}</b>
      <img src="https://i.imgur.com/f7VXJQF.jpeg" width="100%" />
    </div>
  );
};

export default ListingPopUp;
