/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { dbService, storageService } from '../base';

function Tweets({ tweetObject, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObject.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet');
    if (ok) {
      // delete the tweet
      await dbService.doc(`tweets/${tweetObject.id}`).delete();
      await storageService.refFromURL(tweetObject.attachmentUrl).delete();
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObject.text}</h4>
          {tweetObject.attachmentUrl && (
            <img src={tweetObject.attachmentUrl} alt="attachment" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tweets;
