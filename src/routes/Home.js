import React, { useState } from 'react';

function Home() {
  const [tweet, setTweet] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    setTweet({
      [event.target.name]: event.target.value,
    });
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
