import React, { useEffect, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UpdateTweet.module.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

interface IFormInputs {
  tweetContent: string;
}

const UpdateTweet = (props: { where: string }) => {
  const auth = useContext(AuthContext);
  const tweetId = useParams().tid;
  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IFormInputs>({
      mode: "onChange",
    });
  const { sendRequest, error, clearError } = useHttpClient();
  const nav = useNavigate();

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/tweets/${tweetId}`
        );
        setValue("tweetContent", responseData.tweet.tweetContent);
      } catch (err) {
        // Just a comment to block the typescript error
      }
    };
    fetchTweet();
  }, [sendRequest, setValue, tweetId]);

  const onSubmitHandler: SubmitHandler<IFormInputs> = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/tweets/${tweetId}`,
        "PATCH",
        JSON.stringify({
          tweetContent: getValues("tweetContent"),
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      nav("/");
    } catch (err) {
      // Just a comment to block the typescript error
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`${
          props.where === "home" ? classes.formContainer : classes.formAddTweet
        } `}
      >
        <div
          className={`${classes.inputContainer}
        ${classes.inputContainerNewTweet} `}
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
    </React.Fragment>
  );
};

export default UpdateTweet;
