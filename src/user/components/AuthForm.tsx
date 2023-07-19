import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./AuthForm.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

interface AuthFormInputs {
  userName: string;
  email: string;
  password?: string;
}

const AuthForm = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const nav = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<AuthFormInputs>({
      mode: "onChange",
    });

  const submitHandler: SubmitHandler<AuthFormInputs> = async () => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: getValues("email"),
            password: getValues("password"),
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(
          responseData.userId,
          responseData.userName,
          responseData.token
        );
        nav("/");
      } catch (err) {
        //Just here to block the error message
      }
    } else {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          JSON.stringify({
            userName: getValues("userName"),
            email: getValues("email"),
            password: getValues("password"),
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(
          responseData.userId,
          responseData.userName,
          responseData.token
        );
        nav("/");
      } catch (err) {
        //Just a message to avoid the typescript error
      }
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode(!isLoginMode);
    setValue("password", "");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form
          className={classes.authForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <header className={classes.authForm__header}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </header>
          {!isLoginMode && (
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
          )}

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
          <div className={classes.authForm__inputContainer}>
            <input
              placeholder="Password"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "The password must be at least 6 character",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
              })}
            />
            {formState.errors.password?.message && (
              <small>{formState.errors.password.message}</small>
            )}
          </div>

          <div className={classes.buttonContainer}>
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "Log in" : "Sign up"}
            </Button>
            <Button onClick={switchModeHandler} type="button">
              Switch to {isLoginMode ? "SIGN UP" : "LOGIN"}
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default AuthForm;
