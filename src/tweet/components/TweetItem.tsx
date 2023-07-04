import { useContext, useState, useEffect } from "react";
import { tweetType } from "../../shared/interface/tweet";

import classes from "./TweetItem.module.css";
import { AuthContext } from "../../shared/context/auth-context";

const TweetItem = (props: tweetType) => {
  const [isTweetLiked, setIsTweetLiked] = useState(false);
  const [isTweetRt, setIsTweetRt] = useState(false);
  const auth = useContext(AuthContext);

  const toggleLikeTweetHandler = () => {
    if (auth.isLoggedIn) {
      setIsTweetLiked(!isTweetLiked);
    }
  };

  const toggleRtTweetHandler = () => {
    if (auth.isLoggedIn) {
      setIsTweetRt(!isTweetRt);
    }
  };

  useEffect(() => {
    const isUserLikedTweet = props.likes?.find(
      (userId) => userId === auth.userId
    );

    const isUserRtTweet = props.rts?.find((userId) => userId === auth.userId);

    if (isUserLikedTweet && auth.userId.length > 0) {
      setIsTweetLiked(true);
    } else {
      setIsTweetLiked(false);
    }

    if (isUserRtTweet && auth.userId.length > 0) {
      setIsTweetRt(true);
    } else {
      setIsTweetRt(false);
    }
  }, [auth, props]);

  return (
    <li className={classes.tweetItem}>
      <header className={classes.tweetItem__header}>
        <div className={classes.tweetItem__userId}>{`@${props.userId}`}</div>
      </header>
      <p className={classes.tweetItem__para}>{props.message}</p>
      <div className={classes.communityContainer}>
        <div
          className={`${classes.likes} ${isTweetRt && classes.tweetLiked}`}
          onClick={toggleRtTweetHandler}
        >{`rts : ${props.rts.length}`}</div>
        <div
          className={`${classes.likes} ${isTweetLiked && classes.tweetLiked}`}
          onClick={toggleLikeTweetHandler}
        >{`likes : ${props.likes.length}`}</div>
      </div>
    </li>
  );
};

export default TweetItem;
