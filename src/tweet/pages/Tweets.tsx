import { useContext } from "react";
import { tweetType } from "../../shared/interface/tweet";
import TweetList from "../components/TweetList";
import NewTweetButton from "../../shared/components/NewTweet/NewTweetButton";
import NewTweetForm from "../components/NewTweetForm";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Tweets.module.css";

const DUMMY_DATA: tweetType[] = [
  {
    userId: "MomoMotus",
    message: "Je suis le plus beau du monde !",
    rts: ["p1", "p2"],
    likes: ["p1", "p2", "p4"],
  },
  {
    userId: "Chun-li",
    message: "J'ai les plus grosse cuisse du monde !",
    rts: ["p1", "p2"],
    likes: ["p1", "p3", "p4"],
  },
];

const Tweets = () => {
  const auth = useContext(AuthContext);
  return (
    <section className={classes.tweetsContainer}>
      {auth.isLoggedIn && <NewTweetForm where={"home"} />}

      <TweetList items={DUMMY_DATA} />
      <NewTweetButton />
    </section>
  );
};

export default Tweets;
