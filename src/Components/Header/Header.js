import React, { useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";

import classes from "./Header.module.css";
import adminAlternative from "../../Assets/adminAlternative.png";
import littleLogo from "../../Assets/Little_logo.jpg";
import loadingGif from "../../Assets/loading-gif.gif";
import { useHistory } from "react-router-dom";
import ChangePassword from "../Dashboard/ChangePassword";
import { GrClose } from "react-icons/gr";
import useHttp from "../../Hooks/use-http";
import { useEffect } from "react";

const NOTIFICATION_DATA = [
  {
    title: "Another meeting today,",
    status: " at 12:00 PM",
    time: "Just Now",
  },
  {
    title: "Application",
    status: " Error",
    time: "Just Now",
  },
  {
    title: "New User Registration",
    time: "2 days ago",
  },
  {
    title: "Application",
    status: " Error",
    time: "2 days ago",
  },
];

let headerFlag = 0;
const Nav = (props) => {
  const history = useHistory();
  const [adminData, setAdminData] = useState([]);
  const [isAdminPhotoClicked, setIsAdminPhotoClicked] = useState(false);
  const [isNotificationIconClicked, setIsNotificationIconClicked] =
    useState(false);
  const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
  const [isSaveNewPasswordClicked, setIsSaveNewPasswordClicked] =
    useState(false);

  const authenticateUser = (data) => {
    setAdminData(data.AdminInformation[0]);
  };

  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    if (headerFlag > 0) {
      sendRequest({
        url: "/api/v1/Dashboard/GetDashboard",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          emailID: sessionStorage.getItem("user")
        }
      }, authenticateUser);
    }
    headerFlag++;
  }, [sendRequest]);

  const sideMenuClickHandler = () => {
    props.sideMenuOpen();
  };

  const adminPhotoClickHandler = () => {
    setIsNotificationIconClicked(false);
    setIsAdminPhotoClicked((prev) => !prev);
  };

  const notificationIconClicked = () => {
    setIsAdminPhotoClicked(false);
    setIsNotificationIconClicked((prev) => !prev);
  };

  const changePasswordHandler = () => {
    setIsAdminPhotoClicked(false);
    setIsChangePasswordClicked(true);
  };

  const saveNewPasswordClickHandler = () => {
    setIsSaveNewPasswordClicked(true);
    setIsChangePasswordClicked(false);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.sub}>
          <CgMenuMotion className={classes.menuIcon}
            onMouseEnter={sideMenuClickHandler}
          />
          <img src={littleLogo} alt="" className={classes.littleLogo} />
        </div>
        <div className={classes.orgDetails}>

          {isLoading ?
            <div style={{height: "80px"}}>
              <img style={{ marginTop: "25px", height: "25px" }} src={loadingGif} alt="" className={classes.logo} />
            </div> :
            <img src={adminData.CorporateImage} alt="" className={classes.logo} />
          }
          <div className={classes.notificationIcon}>
            <IoMdNotificationsOutline onClick={notificationIconClicked} />
          </div>
          {isNotificationIconClicked && (
            <div className={classes.notificationPanel}>
              <div className={classes.topBorder}></div>
              <div className={classes.header} >Notification</div>
              <hr />
              {NOTIFICATION_DATA.map((ele) => {
                return (
                  <div className={classes.data} >
                    <span className={classes.title} >{ele.title}</span>
                    <span className={classes.status}>
                      {ele.status}
                    </span>
                    <p className={classes.time} >
                      {ele.time}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <img
            src={adminData.AdminImage ? adminData.AdminImage : adminAlternative}
            alt=""
            className={classes.adminPhoto}
            onClick={adminPhotoClickHandler}
          />
          {isAdminPhotoClicked && (
            <div className={classes.adminPanel}>
              <div className={classes.header}>
                <p className={classes.adminName}>
                  {adminData?.AdminName}
                </p>
                <p className={classes.adminOrg}>
                  Admin of {adminData?.Corporate}
                </p>
              </div>
              <p className={classes.changePassword}>Change Photo</p>
              <hr />
              <p className={classes.changePassword} onClick={changePasswordHandler} >
                Change Password
              </p>
              <hr style={{ color: "gray" }} />
              <p className={classes.logout}
                onClick={() => {
                  history.push("/login");
                  sessionStorage.setItem("login", "false");
                  window.location.reload();
                }}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
      {isChangePasswordClicked && (
        <ChangePassword
          close={setIsChangePasswordClicked}
          saveNewPassword={saveNewPasswordClickHandler}
        />
      )}
      {isSaveNewPasswordClicked && (
        <div className={classes.passwordChangedContainer}>
          <div className={classes.passwordChangedMessage}>
            <div className={classes.successHeader}>
              <div>Success</div>
              <GrClose
                onClick={() => setIsSaveNewPasswordClicked(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <hr />
            <div className={classes.passwordText}>
              Your password is successfully updated.
            </div>
            {/* <button className={classes.passwordOk} onClick={() => setIsSaveNewPasswordClicked()} >Ok</button> */}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Nav;
