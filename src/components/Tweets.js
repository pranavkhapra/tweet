/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { dbService } from '../base';

function Tweets({ tweetObject, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObject.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet');
    if (ok) {
      // delete the tweet
      await dbService.doc(`tweets/${tweetObject.id}`).delete();
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObject.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    setNewTweet(event.target.value);
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button type="button" onClick={toggleEditing}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{tweetObject.text}</h4>
          {tweetObject.attachmentUrl && (
            <img
              src={tweetObject.attachmentUrl}
              width="50px"
              height="50px"
              alt="attachment"
            />
          )}
          {isOwner && (
            <>
              <button type="button" onClick={onDeleteClick}>
                Delete Tweet
              </button>
              <button type="button" onClick={toggleEditing}>
                Edit Tweet
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tweets;
