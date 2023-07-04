import { userType } from "../../shared/interface/userType";

import classes from "./Profil.module.css";

interface Props {
  userInfos: userType;
}

const Profil = (props: Props) => {
  return (
    <div className={classes.profilInfos}>
      <div>Profil of : {props.userInfos.userId}</div>
    </div>
  );
};

export default Profil;
