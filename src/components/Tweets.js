/* eslint-disable react/prop-types */
import React from 'react';

function Tweets({ tweetObject, isOwner }) {
  return (
    <div>
      <h4>{tweetObject.text}</h4>
      {isOwner && (
        <>
          <button type="button">Delete Tweet</button>
          <button type="button">Edit Tweet</button>
        </>
      )}
    </div>
  );
}

export default Tweets;
