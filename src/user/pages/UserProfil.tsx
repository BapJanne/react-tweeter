import Profil from "../components/Profil";
import TweetList from "../../tweet/components/TweetList";

import classes from "./UserProfil.module.css";

const UserProfil = () => {
  return (
    <section className={classes.profilContainer}>
      <Profil />
      <TweetList where="profil" />
    </section>
  );
};

export default UserProfil;
