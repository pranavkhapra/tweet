/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../base';
import TweetFactory from '../components/TweetFactory';
import Tweets from '../components/Tweets';
// we dont have to have real time here its best for chat application
function Home({ userObject }) {
  const [tweets, setTweets] = useState([]);
  // when components get mount we call getTweets and get all the data querysnpshot
  // const getTweets = async () => {
  //   const dbTweets = await dbService.collection('tweets').get();
  //   dbTweets.forEach((document) => {
  //     const tweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweets((prev) => [tweetObject, ...prev]);
  //   });
  // };
  // whenever we submit the form we want to create the document

  useEffect(() => {
    // getTweets();
    // making it a real time and all
    // snapshot is basically a listener that tell us what happens to database
    // we create an array and put in tweets array
    dbService.collection('tweets').onSnapshot((snapshot) => {
      const tweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetsArray);
    });
  }, []);

  return (
    <div className="container">
      <TweetFactory userObject={userObject} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((oneTweet) => (
          <Tweets
            key={oneTweet.id}
            tweetObject={oneTweet}
            isOwner={oneTweet.creatorId === userObject.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
