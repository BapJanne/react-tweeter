import { useParams } from "react-router-dom";

import { tweetType } from "../../shared/interface/tweet";
import { userType } from "../../shared/interface/userType";
import Profil from "../components/Profil";

import TweetList from "../../tweet/components/TweetList";

const DUMMY_TWEETS: tweetType[] = [
  {
    userId: "MomoMotus",
    message: "Je suis le plus beau du monde !",
    rts: ["p1", "p2"],
    likes: ["p1", "p2", "p4"],
  },
  {
    userId: "p3",
    message: "J'ai les plus grosse cuisse du monde !",
    rts: ["p1", "p2"],
    likes: ["p1", "p3", "p4"],
  },
  {
    userId: "p2",
    message: " grosse cuisse du monde !",
    rts: ["p1", "p2"],
    likes: ["p1", "p3", "p4"],
  },
  {
    userId: "p2",
    message: "J'ai les plus !",
    rts: ["p1", "p2"],
    likes: ["p3", "p4"],
  },
];

const DUMMY_USER: userType[] = [
  {
    userId: "Chun-li",
  },
  { userId: "p2" },
];

const UserProfil = () => {
  const userId = useParams().userId;

  const userInfos = DUMMY_USER.find((element) => {
    return element.userId === userId;
  });

  const userTweets = DUMMY_TWEETS.filter((element) => {
    return element.userId === userId;
  });

  return (
    <section>
      {userInfos && <Profil userInfos={userInfos} />}
      <TweetList items={userTweets} />
    </section>
  );
};

export default UserProfil;
