import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TweetItem from "./TweetItem";

import classes from "./TweetList.module.css";
import { tweetType } from "../../shared/interface/tweet";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const TweetList = (props: { where: string }) => {
  const userName = useParams().userName;
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const [userTweets, setUserTweets] = useState<tweetType[]>([]);
  const [updateTweet, setUpdateTweet] = useState(false);

  const onUpdateTweet = () => {
    setUpdateTweet(true);
  };

  useEffect(() => {
    if (props.where === "profil") {
      const fetchTweets = async () => {
        try {
          const responseData = await sendRequest(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_URL
            }/tweets/profil/${userName}`
          );

          setUserTweets(responseData.tweets);
          setUpdateTweet(false);
        } catch (err) {
          //Comment to avoid typescript error
        }
      };
      fetchTweets();
    } else {
      const fetchTweets = async () => {
        try {
          const responseData = await sendRequest(
            import.meta.env.VITE_REACT_APP_BACKEND_URL + `/tweets`
          );

          setUserTweets(responseData.tweets);
          setUpdateTweet(false);
        } catch (err) {
          //Comment to avoid typescript error
        }
      };
      fetchTweets();
    }
  }, [sendRequest, userName, updateTweet, props.where]);

  const content = userTweets.map((tweet) => (
    <TweetItem
      author={tweet.authorName}
      tweetContent={tweet.tweetContent}
      likes={tweet.likes}
      rts={tweet.rts}
      id={tweet.id}
      key={tweet.id}
      onAddLike={onUpdateTweet}
      onAddRt={onUpdateTweet}
      onDeleteTweet={onUpdateTweet}
    />
  ));

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* {!isLoading && userTweets.length === 0 && !error && <LoadingSpinner />} */}
      {!isLoading && <LoadingSpinner />}
      {/* {!isLoading && userTweets.length === 0 && (
        <div className={classes.noTweetContainer}>
          <p>There is no tweet</p>
        </div>
      )} */}

      <ul
        className={`${
          props.where !== "home" ? classes.tweetList : classes.tweetListHome
        }`}
      >
        {/* {content} */}
      </ul>
    </React.Fragment>
  );
};

export default TweetList;
