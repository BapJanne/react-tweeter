import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./AuthForm.module.css";

interface AuthFormInputs {
  userName: string;
  email: string;
  password?: string;
}

const AuthForm = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const nav = useNavigate();

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<AuthFormInputs>({
      mode: "onChange",
    });

  const submitHandler: SubmitHandler<AuthFormInputs> = (data) => {
    console.log(data);
    auth.login(getValues("userName"));
    nav("/");
  };

  const switchModeHandler = () => {
    setIsLoginMode(!isLoginMode);
    setValue("password", "");
  };

  console.log(auth.userId);

  return (
    <form className={classes.authForm} onSubmit={handleSubmit(submitHandler)}>
      <header className={classes.authForm__header}>
        {isLoginMode ? "LOGIN" : "SIGN UP"}
      </header>
      <div className={classes.authForm__inputContainer}>
        <input
          placeholder="Username"
          id="userName"
          {...register("userName", {
            required: "User name is required",
            maxLength: {
              value: 20,
              message: "The user name must not exceed 20 characters",
            },
          })}
        />
        {formState.errors.userName?.message && (
          <small>{formState.errors.userName.message}</small>
        )}
      </div>

      <div className={classes.authForm__inputContainer}>
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
          type="email"
          className="input"
        />
        {formState.errors.email?.message && (
          <small>{formState.errors.email.message}</small>
        )}
      </div>
      {!isLoginMode && (
        <div className={classes.authForm__inputContainer}>
          <input
            placeholder="Password"
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              maxLength: {
                value: 20,
                message: "The user name must not exceed 20 characters",
              },
            })}
          />
          {formState.errors.password?.message && (
            <small>{formState.errors.password.message}</small>
          )}
        </div>
      )}

      <div className={classes.buttonContainer}>
        <Button type="submit" disabled={!formState.isValid}>
          Log in
        </Button>
        <Button onClick={switchModeHandler} type="button">
          {isLoginMode ? "SIGN UP" : "LOGIN"}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
