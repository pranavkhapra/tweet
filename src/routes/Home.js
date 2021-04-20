import React, { useState } from 'react';
import { dbService } from '../base';

function Home() {
  const [tweet, setTweet] = useState([]);
  // whenever we submit the form we want to create the document
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('tweets').add({
      tweet,
      createdAt: Date.now(),
    });
    // when created the new tweet is empty again
    setTweet('');
  };
  const onChange = (event) => {
    setTweet(event.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?."
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="tweet" />
      </form>
    </div>
  );
}

export default Home;
