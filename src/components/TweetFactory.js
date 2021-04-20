/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { dbService, storageService } from '../base';

function TweetFactory({ userObject }) {
  const [tweet, setTweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (event) => {
    if (tweet === '') {
      return;
    }
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentReference = storageService
        .ref()
        .child(`${userObject.uid}/${uuidv4()}`);
      const response = await attachmentReference.putString(
        attachment,
        'data_url'
      );
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const ptweet = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      attachmentUrl,
    };
    await dbService.collection('tweets').add(ptweet);
    //   text: tweet,
    //   createdAt: Date.now(),
    //   creatorId: userObject.uid,
    // });
    // // when created the new tweet is empty again
    setTweet('');
    setAttachment('');
  };
  const onChange = (event) => {
    setTweet(event.target.value);
  };
  const onFileChange = (event) => {
    // get the file
    const theFile = event.target.files[0];
    // read the file
    const reader = new FileReader();
    // read the file as data url
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      setAttachment(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    setAttachment(null);
  };
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt="attachment"
          />
          <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}

export default TweetFactory;
