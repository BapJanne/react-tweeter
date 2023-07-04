import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./Navigation.module.css";
import Button from "../FormElements/Button";

const MobileNavigation = () => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className={classes.mobileNavContainer}>
      <ul className={classes.mobileNavUl}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.activeNavLink : classes.nav_link
            }
          >
            Home
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink
              to="/p2"
              className={({ isActive }) =>
                isActive ? classes.activeNavLink : classes.nav_link
              }
            >
              account
            </NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.activeNavLink : classes.nav_link
              }
            >
              Log In
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <Button
              onClick={() => {
                auth.logout();
                nav("/");
              }}
            >
              Log out
            </Button>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/newTweet" className={classes.newTweetLink}>
              new tweet
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNavigation;
