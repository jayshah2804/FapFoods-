import React, { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineDashboard,
} from "react-icons/md";
import { NavLink, useHistory } from "react-router-dom";

import classes from "./SideMenuData.module.css";

const SideMenuData = ({ main, sub, myActiveMenu, sideMenuClose }) => {
  const [subMenuIsAvtive, setSubMenuIsActive] = useState(false);
  const history = useHistory();

  const mainMenuClickHandler = (e) => {
    setSubMenuIsActive((prev) => !prev);
    if (e.target.innerText === "Dashboard") {
      sideMenuClose(false);
      history.push("/" + e.target.innerText);
    }
  };

  const subMenuClickHandler = (e) => {
    if (e.target.innerText === "Trips") {
      sideMenuClose(false);
      history.push("/" + e.target.innerText);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.menu}>
        <MdOutlineDashboard className={classes.frontIcons} />
        {/* <NavLink to="#"
          className={classes.mainMenu}
          onClick={() => setSubMenuIsActive((prev) => !prev)}
        >
          {main}
        </NavLink> */}
        <div className={classes.mainMenu} onClick={mainMenuClickHandler}>
          {main}
        </div>
        {sub && (
          <div className={classes.dropIcons}>
            {subMenuIsAvtive ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        )}
      </div>
      {subMenuIsAvtive && (
        <div>
          {sub &&
            sub.map((ele) => (
              <p className={classes.subMenu} onClick={subMenuClickHandler}>
                {ele}
              </p>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default SideMenuData;
