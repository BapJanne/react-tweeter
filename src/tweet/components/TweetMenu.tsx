import menuTweetImage from "../../images/menuTweet.png";

import classes from "./TweetMenu.module.css";

const TweetMenu = (props: { onClickMenu: () => void }) => {
  return (
    <div onClick={props.onClickMenu}>
      <img src={menuTweetImage} className={classes.menuTweetImg} />
    </div>
  );
};

export default TweetMenu;
