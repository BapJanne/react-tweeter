import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tweets from "../../../tweet/pages/Tweets";
import Navigation from "../Navigation/Navigation";
import NewTweetPage from "../../../tweet/pages/NewTweetPage";
import AuthPage from "../../../user/pages/AuthPage";
import { AuthContext } from "../../context/auth-context";
import { ThemeContext } from "../../context/theme-context";
import UserProfil from "../../../user/pages/UserProfil";

import classes from "./Routing.module.css";

const Routing = () => {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  let routes;

  if (auth.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Tweets />} />
        <Route path="/:userId" element={<UserProfil />} />
        <Route path="/:userId/:tweetId" />
        <Route path="/newTweet" element={<NewTweetPage />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Tweets />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    );
  }

  return (
    <Router>
      <div className={classes.appContainer}>
        <Navigation />
        <main className={classes.main}>{routes}</main>
      </div>
    </Router>
  );
};

export default Routing;
