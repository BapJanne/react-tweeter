import React from "react";

import classes from "./Tweets.module.css";
import TweetList from "../components/TweetList";
import NewTweetButton from "../../shared/components/NewTweet/NewTweetButton";

import twitterLogo from "../../images/twiterLogo.png";

const Tweets = () => {
  return (
    <React.Fragment>
      <section className={classes.tweetsContainer}>
        <React.Fragment>
          <div className={classes.twitterLogoHeader}>
            <img src={twitterLogo} />
          </div>
          <TweetList where="home" />
          <NewTweetButton />
        </React.Fragment>
      </section>
    </React.Fragment>
  );
};

export default Tweets;
