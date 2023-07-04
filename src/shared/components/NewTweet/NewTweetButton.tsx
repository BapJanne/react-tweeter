import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import classes from "./NewTweetButton.module.css";

const NewTweetButton = () => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      {!auth.isLoggedIn && (
        <NavLink to="/auth" className={classes.newTweet}>
          New tweet
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to="/newTweet" className={classes.newTweet}>
          New tweet
        </NavLink>
      )}
    </React.Fragment>
  );
};

export default NewTweetButton;
