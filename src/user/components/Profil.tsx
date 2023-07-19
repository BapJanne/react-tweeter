import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";

import classes from "./Profil.module.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Profil = () => {
  const [userInfos, setUserInfos] = useState<any>();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const userName = useParams().userName;

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users/${userName}`
        );

        setUserInfos(responseData.userInfos);
      } catch (err) {
        //Comment to avoid typescript error
      }
    };
    fetchUserInfos();
  }, [sendRequest, userName]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className={classes.profilInfos}>
          {!isLoading && userInfos && (
            <div>Profil of : {userInfos.userName}</div>
          )}{" "}
          {!isLoading && !userInfos && <p>There is no infos for this user</p>}
        </div>
      )}
    </React.Fragment>
  );
};

export default Profil;
