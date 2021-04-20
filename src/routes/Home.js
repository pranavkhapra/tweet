import React, { useState, useEffect } from 'react';
import { dbService } from '../base';

function Home() {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  // when components get mount we call getTweets and get all the data querysnpshot
  const getTweets = async () => {
    const dbTweets = await dbService.collection('tweets').get();
    dbTweets.forEach((document) => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [tweetObject, ...prev]);
    });
  };
  // whenever we submit the form we want to create the document

  useEffect(() => {
    getTweets();
  }, []);
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
      <div>
        {tweets.map((oneTweet) => (
          <div key={oneTweet.id}>
            <h1>{oneTweet.tweet}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
