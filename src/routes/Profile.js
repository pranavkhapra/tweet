/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../base';

function Profile({ userObject }) {
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
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="text" placeholder="Update Profile" />
      </form>
      <button type="button" onClick={OnLogOutClick}>
        Log Out
      </button>
    </>
  );
}

export default Profile;
