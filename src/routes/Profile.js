/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../base';

function Profile({ userObject, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
  const OnLogOutClick = () => {
    authService.signOut();
  };
  // getting my tweets
  // const getMyTweets = async () => {
  //   const tweets = await dbService
  //     .collection('Tweets')
  //     .where('creatorId', '==', userObject.uid)
  //     .orderBy('createdAt')
  //     .get();
  // };
  // useEffect(() => {
  //   getMyTweets();
  // }, []);
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    // update the name
    if (userObject.displayName !== newDisplayName) {
      // then i want to update the profile
      await userObject.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            type="text"
            placeholder="Display Name"
            autoFocus
            onChange={onChange}
            value={newDisplayName}
            className="formInput"
          />
          <input
            type="submit"
            placeholder="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={OnLogOutClick}>
          Log Out
        </span>
      </div>
    </>
  );
}

export default Profile;
