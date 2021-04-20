/* eslint-disable react/prop-types */
import React from 'react';
import { dbService } from '../base';

function Tweets({ tweetObject, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet');
    if (ok) {
      // delete the tweet
      await dbService.doc(`tweets/${tweetObject.id}`).delete();
    }
  };
  const onEditClick = () => {
    //
  };
  return (
    <div>
      <h4>{tweetObject.text}</h4>
      {isOwner && (
        <>
          <button type="button" onClick={onDeleteClick}>
            Delete Tweet
          </button>
          <button type="button" onClick={onEditClick}>
            Edit Tweet
          </button>
        </>
      )}
    </div>
  );
}

export default Tweets;
