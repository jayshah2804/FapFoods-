import React from "react";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";

import ConfirmPassword from "./ConfirmPassword";
import classes from "./ForgotPassword.module.css";

let buttonValue = "Send OTP";
const ForgotPassword = (props) => {
  const [isSendOtpClicked, setIsSendOtpClicked] = useState();
  const [isVerifyClicked, setIsVerifyClicked] = useState();

  const sendOtpClickHandler = () => {
    if (buttonValue === "Verify") {
      setIsVerifyClicked(true);
      buttonValue = "Go to Login Page";
    } else {
      buttonValue = "Verify";
      setIsSendOtpClicked(true);
    }
  };
  const backClickHandler = () => {
    if (buttonValue === "Send OTP") {
      props.forgotPassword(false);
    } else if (buttonValue === "Verify") {
      setIsVerifyClicked(false);
      setIsSendOtpClicked(false);
      buttonValue = "Send OTP";
    } else if (buttonValue === "Go to Login Page") {
      buttonValue = "Send OTP";
      setIsSendOtpClicked(false);
      setIsVerifyClicked(false);
    }
  };
  return (
    <div>
      <MdArrowBack
        className={classes.backArrow}
        onClick={backClickHandler}
      />
      {!isVerifyClicked && (
        <div id="form">
          <input
            type="text"
            placeholder="Enter Your Registered Email"
            id="input"
          />
          {isSendOtpClicked && (
            <input type="number" placeholder="Enter OTP" id="input" />
          )}
          <input
            type="submit"
            value={buttonValue}
            id="loginButton"
            onClick={sendOtpClickHandler}
          />
        </div>
      )}
      {isVerifyClicked && (
        <ConfirmPassword forgotPassword={props.forgotPassword} />
      )}
    </div>
  );
};

export default ForgotPassword;
