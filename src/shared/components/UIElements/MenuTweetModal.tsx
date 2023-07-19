import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import Modal from "./Modal";
import ErrorModal from "./ErrorModal";
import { AuthContext } from "../../context/auth-context";

const MenuTweetModal = (props: any) => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttpClient();

  const deleteTweetHandler = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/tweets/${props.tweetId}`,
        "DELETE",
        JSON.stringify({}),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      props.onDeleteTweet();
    } catch (err) {
      // Just a comment to block the typescript error
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal show={props.show} modal="menuTweet" onCancel={props.onCancel}>
        <div onClick={deleteTweetHandler}>Effacer le tweet</div>
        <NavLink
          to={`/updateTweet/${props.tweetId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          Mettre à jour le tweet
        </NavLink>
      </Modal>
    </React.Fragment>
  );
};

export default MenuTweetModal;
