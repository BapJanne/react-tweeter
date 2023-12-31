import classes from "./Button.module.css";

const Button = (props: any) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={`${classes.button} ${
        props.type === "submit" ? classes.buttonSubmit : classes.buttonNav
      } ${props.type === "button" && classes.buttonChangeMode}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
