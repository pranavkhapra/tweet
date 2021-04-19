import React from 'react';
import { authService } from '../base';

function Profile() {
  const onClick = () => {
    authService.signOut();
  };
  return (
    <>
      <button type="button" onClick={onClick}>
        Log Out
      </button>
    </>
  );
}

export default Profile;
