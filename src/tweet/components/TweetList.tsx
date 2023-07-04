import Tweet from "./TweetItem";
import { tweetType } from "../../shared/interface/tweet";

import classes from "./TweetList.module.css";

const TweetList = (props: { items: tweetType[] }) => {
  const content = props.items.map((tweet: tweetType, index) => (
    <Tweet
      userId={tweet.userId}
      message={tweet.message}
      likes={tweet.likes}
      rts={tweet.rts}
      key={tweet.userId + index}
    />
  ));

  return <ul className={classes.tweetList}>{content}</ul>;
};

export default TweetList;
