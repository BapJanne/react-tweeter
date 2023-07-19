import React, { useContext, useState, useEffect } from "react";

import classes from "./TweetItem.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import TweetMenu from "./TweetMenu";
import MenuTweetModal from "../../shared/components/UIElements/MenuTweetModal";
import { ReactComponent as RtSvg } from "../../images/retweetSVG.svg";

const TweetItem = (props: any) => {
  const [isTweetLiked, setIsTweetLiked] = useState(false);
  const [isTweetAlreadyLiked, setIsTweetAlreadyLiked] = useState(false);
  const [isTweetRt, setIsTweetRt] = useState(false);
  const [showTweetMenu, setShowTweetMenu] = useState(false);
  const { sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const onClickMenuHandler = () => {
    setShowTweetMenu(!showTweetMenu);
  };

  const likeTweetHandler = async () => {
    if (auth.isLoggedIn) {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/tweets/likes/${
          props.id
        }`,
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );

      if (responseData.tweet.likes.includes(auth.userId)) {
        setIsTweetLiked(true);
        setIsTweetAlreadyLiked(false);
      } else {
        setIsTweetLiked(false);
      }

      props.onAddLike();
    }
  };

  const rtTweetHandler = async () => {
    if (auth.isLoggedIn) {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/tweets/rts/${props.id}`,
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      props.onAddRt();
    }
  };

  useEffect(() => {
    const isUserLikedTweet = props.likes?.find(
      (userId: string) => userId === auth.userId
    );

    const isUserRtTweet = props.rts?.find(
      (userId: string) => userId === auth.userId
    );

    if (isUserLikedTweet && auth.isLoggedIn) {
      setIsTweetAlreadyLiked(true);
    } else {
      setIsTweetAlreadyLiked(false);
    }

    if (isUserRtTweet && auth.isLoggedIn) {
      setIsTweetRt(true);
    } else {
      setIsTweetRt(false);
    }
  }, [auth, props]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <MenuTweetModal
        show={showTweetMenu}
        onCancel={onClickMenuHandler}
        tweetId={props.id}
        onDeleteTweet={props.onDeleteTweet}
      />
      <li className={classes.tweetItem}>
        <header className={classes.tweetItem__header}>
          <Link
            to={`/profil/${props.author}`}
            className={classes.tweetItem__userId}
            style={{ textDecoration: "none" }}
          >{`@${props.author}`}</Link>
          {auth.userName === props.author && (
            <TweetMenu onClickMenu={onClickMenuHandler} />
          )}
        </header>
        <p className={classes.tweetItem__para}>{props.tweetContent}</p>
        <div className={classes.communityContainer}>
          <div
            className={`${classes.rtButton} ${isTweetRt && classes.tweetLiked}`}
            onClick={rtTweetHandler}
          >
            <div className={classes.rtBg}>
              <div className={classes.rtIcon}>
                <RtSvg />
              </div>
            </div>
            <div
              className={`${classes.rtAmount} ${
                isTweetRt && classes.rtAmountIsRted
              }`}
            >
              {props.rts.length}
            </div>
          </div>
          <div
            className={`${classes.likesButton} ${
              isTweetLiked && classes.tweetLiked
            }`}
            onClick={likeTweetHandler}
          >
            <div className={classes.heartBg}>
              <div
                className={`${classes.heartIcon} ${
                  isTweetLiked && auth.isLoggedIn && classes.tweetLiked
                } ${
                  isTweetAlreadyLiked &&
                  !isTweetLiked &&
                  classes.tweetAlreadyLiked
                }`}
              ></div>
            </div>
            <div
              className={`${
                isTweetLiked && auth.isLoggedIn
                  ? classes.likesAmountIsLiked
                  : classes.likesAmount
              } ${isTweetAlreadyLiked && classes.likesAmountIsLiked}`}
            >
              {props.likes.length}
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default TweetItem;
