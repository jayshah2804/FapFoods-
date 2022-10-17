import React from "react";
import classes from "./SideMenu.module.css";
import SideMenuData from "./SideMenuData";
import { GrClose } from "react-icons/gr";

const DUMMY_MENU_DATA = [
  {
    main: "Dashboard",
  },
  {
    main: "Student Department",
    sub: ["Employees", "Delete Employees", "Private Drive"],
  },
  {
    main: "S.S Divine School",
    sub: ["Departments", "Admins", "Trips", "Budget & Insurance"],
  },
  {
    main: "Departments",
  },
];

let flag = false;
const SideMenu = (props) => {
  const currentActiveMenuHandler = (data) => {
    console.log(data);
  };

  if (props.property) {
    document.getElementById("mySidemenu").style.width = "300px";
    flag = true;
  } else {
    if (flag) document.getElementById("mySidemenu").style.width = "0px";
  }

  return (
    <div className={classes.menuContainer} id="mySidemenu">
      <div
        className={classes.subMenu}
        onMouseLeave={() => props.sideMenuClose()}
      >
        <div
          className={classes.closeIcon}
          onClick={() => props.sideMenuClose()}
        >
          <GrClose />
        </div>
        {DUMMY_MENU_DATA.map(({ main, sub }, index) => {
          return (
            <SideMenuData
              key={index}
              main={main}
              sub={sub}
              myActiveMenu={currentActiveMenuHandler}
              sideMenuClose={props.sideMenuClose}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
