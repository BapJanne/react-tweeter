import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const ModalOverlay = (props: any) => {
  const modalElement = document.getElementById("modal-hook") as HTMLElement;

  let content;

  if (props.modal === "menuTweet") {
    content = <div className={classes.MenuTweetModal}>{props.children}</div>;
  } else {
    content = (
      <div
        className={`${classes.modal} ${props.className}`}
        style={props.style}
      >
        <header className={` ${classes.modal__header} ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
        <div>
          <div className={` ${classes.modal__content} ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`${classes.modal__footer} ${props.footerClass}`}>
            {props.footer}
          </footer>
        </div>
      </div>
    );
  }

  return ReactDOM.createPortal(content, modalElement);
};

const Modal = (props: any) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={{
          enter:
            props.modal === "error"
              ? classes.modalEnter
              : classes.modalBottomEnter,
          enterActive:
            props.modal === "error"
              ? classes.modalEnterActive
              : classes.modalBottomEnterActive,
          exitDone:
            props.modal === "error"
              ? classes.modalExit
              : classes.modalBottomExit,
          exitActive:
            props.modal === "error"
              ? classes.modalExitActive
              : classes.modalBottomExitActive,
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
