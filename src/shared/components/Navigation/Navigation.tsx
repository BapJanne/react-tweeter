import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./Navigation.module.css";
import Button from "../FormElements/Button";
import twitterLogo from "../../../images/twiterLogo.png";

const MobileNavigation = () => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className={classes.mobileNavContainer}>
      <ul className={classes.mobileNavUl}>
        <li className={classes.logoLi}>
          <img src={twitterLogo} className={classes.twitterLogo} />
        </li>
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
              to={`/profil/${auth.userName}`}
              className={({ isActive }) =>
                isActive ? classes.activeNavLink : classes.nav_link
              }
            >
              Profil
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
            <NavLink
              to="/newTweet"
              className={({ isActive }) =>
                isActive ? classes.activeNavLink : classes.nav_link
              }
            >
              New tweet
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
      </ul>
    </nav>
  );
};

export default MobileNavigation;
