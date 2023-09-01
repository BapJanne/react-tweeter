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
            {isLoginMode ? "SE CONNECTER" : "CREER UN COMPTE"}
          </header>
          {!isLoginMode && (
            <div className={classes.authForm__inputContainer}>
              <input
                placeholder="Nom d'utilisateur"
                id="userName"
                {...register("userName", {
                  required: "Un nom d'utilisateur est requis",
                  maxLength: {
                    value: 20,
                    message:
                      "Le nom d'utilisateur ne doit pas dépasser 20 caractères",
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
                required: "Un email est requis",
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
              placeholder="Mot de passe"
              id="password"
              type="password"
              {...register("password", {
                required: "Le mot de passe est requis",
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit être d'au moins 6 caractères",
                },
                maxLength: {
                  value: 20,
                  message: "Le mot de passe ne doit pas dépasser 20 caractères",
                },
              })}
            />
            {formState.errors.password?.message && (
              <small>{formState.errors.password.message}</small>
            )}
          </div>

          <div className={classes.buttonContainer}>
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "Se connecter" : "Créer compte"}
            </Button>
            <Button onClick={switchModeHandler} type="submit">
              {isLoginMode ? (
                "Créer un compte"
              ) : (
                <div>
                  <div>Déja un compte?</div>
                  <div>Se connecter</div>
                </div>
              )}
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default AuthForm;
