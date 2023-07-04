import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../shared/components/FormElements/Button";

import classes from "./NewTweetForm.module.css";

interface IFormInputs {
  tweetContent: string;
}

const NewTweetForm = (props: { where: string }) => {
  const { register, handleSubmit, formState } = useForm<IFormInputs>({
    mode: "onChange",
  });

  const onSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={`${
        props.where === "home" ? classes.formContainer : classes.formAddTweet
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
          {...register("tweetContent", { required: true, maxLength: 2 })}
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
  );
};

export default NewTweetForm;
