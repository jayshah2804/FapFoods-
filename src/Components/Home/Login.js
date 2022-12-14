import React, { useRef, useState } from "react";
import classes from "./Login.module.css";

import littleImage from "../../Assets/Little_logo_login.png";
import ForgotPassword from "./ForgotPassword";
import { useEffect } from "react";
import useHttp from "../../Hooks/use-http";
import { useCallback } from "react";

let DATA_ERROR = {
  emailError: "",
  passwordError: "",
};
let fromIsValid = true;
let jay = 0;
const Login = ({ login }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [formError, setFormError] = useState(DATA_ERROR);
  const [isCall, setIsCall] = useState();
  const [isApiError, setIsApiError] = useState();

  const authenticateUser = (data) => {
    sessionStorage.setItem("user", emailInputRef.current.value);
    if (!data.Message)
      setIsApiError(data + " Please try again later");
    else
      data.Message === "Success" ? login(true) : setIsApiError("Please enter valid email or password");
  };

  const { sendRequest } = useHttp();

  useEffect(() => {
    if (jay > 1)
      sendRequest({
        url: "/api/v1/Authentication/AuthenticateUser",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          emailID: emailInputRef.current.value,
          password: passwordInputRef.current.value
        }
      }, authenticateUser);
    jay++;
  }, [isCall, sendRequest])

  const loginHandler = (event) => {
    event.preventDefault();
    // !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4,5,6,7})+$/.test(
    if (                      // eslint-disable-next-line 
      !/\S+@\S+\.\S+/.test(
        emailInputRef.current.value
      )
    ) {
      // eslint-disable-line
      fromIsValid = false;
      setFormError((prev) => ({ ...prev, emailError: "Email is Invalid" }));
    }
    if (passwordInputRef.current.value.length < 8) {
      fromIsValid = false;
      setFormError((prev) => ({
        ...prev,
        passwordError: "Password must be of 8 characters",
      }));
    }
    if (emailInputRef.current.value && passwordInputRef.current.value) {
      // fromIsValid && login(true);
      fromIsValid && setIsCall(prev => !prev);
    }
  };

  const emailChangeHandler = () => {
    setIsApiError("");
    if (                            // eslint-disable-next-line
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        emailInputRef?.current?.value
      )
    ) {
      // eslint-disable-line
      fromIsValid = true;
      setFormError((prev) => ({ ...prev, emailError: "" }));
    } else fromIsValid = false;
  };

  const passwordChangeHandler = () => {
    setIsApiError("");
    if (passwordInputRef.current.value.length >= 8) {
      fromIsValid = true;
      setFormError((prev) => ({ ...prev, passwordError: "" }));
    } else fromIsValid = false;
  };

  const forgotPasswordHandler = () => {
    setIsForgotPasswordClicked(true);
  };
  return (
    <div className={classes.loginContainer}>
      <img src={littleImage} alt="" className={classes.logo} />
      <div className={classes.text}>Access Your Corporate Account</div>
      <p className={classes.errorMessage}>{isApiError}</p>
      {/* <form className={classes.form} onSubmit={loginHandler}> */}
      <form className={classes.form}>
        {!isForgotPasswordClicked && (
          <React.Fragment>
            <input
              type="text"
              placeholder="Email"
              className={classes.input}
              ref={emailInputRef}
              onChange={emailChangeHandler}
            />
            {formError && (
              <p className={classes.errorMessage}>{formError.emailError}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              className={classes.input}
              ref={passwordInputRef}
              onChange={passwordChangeHandler}
            />
            {formError && (
              <p className={classes.errorMessage}>{formError.passwordError}</p>
            )}
            <div
              className={classes.forgotPassword}
              onClick={forgotPasswordHandler}
            >
              Forgot password?
            </div>
            <input
              type="submit"
              value="Login"
              className={classes.loginButton}
              onClick={loginHandler}
            />
          </React.Fragment>
        )}
        {isForgotPasswordClicked && (
          <React.Fragment>
            <ForgotPassword forgotPassword={setIsForgotPasswordClicked} />
          </React.Fragment>
        )}
      </form>
    </div>
  );
};

export default Login;
