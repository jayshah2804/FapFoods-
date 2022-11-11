import React, { useRef, useState } from "react";
import classes from "./Login.module.css";

import littleImage from "../../Assets/Little_logo_login.png";
import ForgotPassword from "./ForgotPassword";
import { useEffect } from "react";

let DATA_ERROR = {
  emailError: "",
  passwordError: "",
};
let fromIsValid = false;
let jay = 0;
const Login = ({ login }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [error, setError] = useState(DATA_ERROR);
  const [isCall, setIsCall] = useState();


  useEffect(() => {
    function myFunc() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        emailID: emailInputRef.current.value,
        password: passwordInputRef.current.value
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://192.168.10.1:2030/api/v1/Authentication/AuthenticateUser", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    if (jay > 1)
      myFunc();
    jay++;
  }, [isCall])

  const loginHandler = (event) => {
    event.preventDefault();
    // if (                      // eslint-disable-next-line 
    //   !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    //     emailInputRef.current.value
    //   )
    // )
    //   // eslint-disable-line
    //   setError((prev) => ({ ...prev, emailError: "Email is Invalid" }));
    if (passwordInputRef.current.value.length < 8)
      setError((prev) => ({
        ...prev,
        passwordError: "Password must be of 8 characters",
      }));
    if (emailInputRef.current.value && passwordInputRef.current.value) {
      // fromIsValid && login(true);
      fromIsValid && login(true);
    }
  };

  const emailChangeHandler = () => {
    if (                            // eslint-disable-next-line
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        emailInputRef?.current?.value
      )
    ) {
      // eslint-disable-line
      fromIsValid = true;
      setError((prev) => ({ ...prev, emailError: "" }));
    } else fromIsValid = false;
  };

  const passwordChangeHandler = () => {
    if (passwordInputRef.current.value.length >= 8) {
      fromIsValid = true;
      setError((prev) => ({ ...prev, passwordError: "" }));
    } else fromIsValid = false;
  };

  const forgotPasswordHandler = () => {
    setIsForgotPasswordClicked(true);
  };
  return (
    <div className={classes.loginContainer}>
      <img src={littleImage} alt="" className={classes.logo} />
      <div className={classes.text}>Access Your Corporate Account</div>
      <form className={classes.form} onSubmit={loginHandler}>
        {!isForgotPasswordClicked && (
          <React.Fragment>
            <input
              type="text"
              placeholder="Email"
              className={classes.input}
              ref={emailInputRef}
              onChange={emailChangeHandler}
            />
            {error && (
              <p className={classes.errorMessage}>{error.emailError}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              className={classes.input}
              ref={passwordInputRef}
              onChange={passwordChangeHandler}
            />
            {error && (
              <p className={classes.errorMessage}>{error.passwordError}</p>
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
