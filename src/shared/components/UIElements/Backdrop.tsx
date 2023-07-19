import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";

const Backdrop = (props: any) => {
  const backdropElement = document.getElementById(
    "backdrop-hook"
  ) as HTMLElement;

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={props.onClick}></div>,
    backdropElement
  );
};

export default Backdrop;
