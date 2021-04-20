/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from '../base';
import Tweets from '../components/Tweets';
// we dont have to have real time here its best for chat application
function Home({ userObject }) {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(null);
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
  const onSubmit = async (event) => {
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?."
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachment && (
          <>
            <img src={attachment} width="50px" height="50px" alt="attachment" />
            <button onClick={onClearAttachmentClick} type="button">
              Cancel Upload
            </button>
          </>
        )}
      </form>
      <div>
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
