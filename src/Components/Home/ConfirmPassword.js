import React from "react";

const ConfirmPassword = (props) => {
  return (
    <div id="form">
      <input type="password" placeholder="Enter New Password" id="input" />
      <input type="password" placeholder="Confirm New Password" id="input" />
      <input
        type="submit"
        value="Go to Login Page"
        id="loginButton"
        onClick={() => props.forgotPassword(false)}
      />
    </div>
  );
};

export default ConfirmPassword;
