import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";

import classes from "./NewTweetForm.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

interface IFormInputs {
  tweetContent: string;
}

const NewTweetForm = (props: any) => {
  const auth = useContext(AuthContext);
  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IFormInputs>({
      mode: "onChange",
    });
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const nav = useNavigate();

  const onSubmitHandler: SubmitHandler<IFormInputs> = async () => {
    try {
      await sendRequest(
        import.meta.env.VITE_REACT_APP_BACKEND_URL + "/tweets/newTweet",
        "POST",
        JSON.stringify({
          tweetContent: getValues("tweetContent"),
          authorName: auth.userName,
          authorId: auth.userId,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      if (props.where === "home" || props.where === "page") {
        nav("/");
      }

      setValue("tweetContent", "");
      props.onAddTweet();
    } catch (err) {
      // Just a comment to block the typescript error
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={`${
            props.where === "home"
              ? classes.formContainer
              : classes.formAddTweet
          } `}
        >
          <div
            className={`${classes.inputContainer}
        ${
          props.where === "home"
            ? classes.inputContainerHome
            : classes.inputContainerNewTweet
        } `}
          >
            <textarea
              className={`${classes.textarea}`}
              placeholder="Quoi de neuf?"
              id="tweetContent"
              {...register("tweetContent", { required: true, maxLength: 255 })}
            />
            {formState.errors.tweetContent?.type === "required" && (
              <small className={classes.small}>This field is required</small>
            )}
            {formState.errors.tweetContent?.type === "maxLength" && (
              <small className={classes.small}>
                The maximum length of a tweet is 255 characters.
              </small>
            )}
            <Button
              type="submit"
              disabled={!formState.isValid}
              placeholder="Quoi de neuf?"
            >
              Tweet
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default NewTweetForm;
