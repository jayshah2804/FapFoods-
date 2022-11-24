import React, { useEffect, useState } from "react";
import classes from "./SideMenu.module.css";
import SideMenuData from "./SideMenuData";
import { GrClose } from "react-icons/gr";
import useHttp from "../../Hooks/use-http";

const DUMMY_MENU_DATA = [
  {
    main: "Dashboard",
  },
  {
    main: "Student Department",
    sub: ["Staff Members", "Deleted Staff Members", "Private Drive"],
  },
  {
    main: "Eximious Global",
    sub: ["Departments", "Admins", "Trips"],
  },
  {
    main: "Departments",
  },
  {
    main: "All Staff",
  },
  {
    main: "Routes"
  },
  {
    main: "Query & Support"
  }
];

let sideMenuFlag = 0;
let flag = false;
const SideMenu = (props) => {
  const [sideMenuData, setSideMenuData] = useState([]);
  const { sendRequest } = useHttp();

  const authenticateUser = (data) => {
    let sideMenu = [];
    if (data.MenuList) {
      sessionStorage.setItem("corpId", data.MenuList[0].CorporateID);
      sideMenu.push({
        main: "Dashboard"
      },
        {
          main: data.MenuList[0].CorporateName,
          corpId: data.MenuList[0].CorporateID,
          sub: ["Departments", "Admins", "Trips"]
        });
      if (data.MenuList[0].DepartMentName) {
        for (let i = 0; i < data.MenuList.length; i++) {
          sideMenu.push({
            main: data.MenuList[i].DepartMentName,
            deptId: data.MenuList[i].DepartmentID,
            sub: ["Staff Members", "Private Drive"]
          });
        }
      }
      sideMenu.push({
        main: "Departments",
      },
        {
          main: "All Staff",
        },
        {
          main: "Routes"
        },
        {
          main: "Documents Upload"
        },
        {
          main: "Query & Support"
        })
    }
    setSideMenuData(sideMenu);
  };
  useEffect(() => {
    if (sideMenuFlag > 0) {
      sendRequest({
        url: "/api/v1/Menu/GetMenuList",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          emailID: sessionStorage.getItem("user")
        }
      }, authenticateUser);
    }
    sideMenuFlag++;
  }, []);

  const currentActiveMenuHandler = (data) => {
    console.log(data);
  };

  // if (props.property) {
  //   document.getElementById("mySidemenu").style.width = "300px";
  //   flag = true;
  // } else {
  //   if (flag) document.getElementById("mySidemenu").style.width = "0px";
  // }

  if (props.property) {
    document.getElementById("mySidemenu").style.width = "300px";
    window.addEventListener("popstate", function (event) {
      // alert(document.getElementById("mySidemenu").style.width);
      if (document.getElementById("mySidemenu").style.width == "300px")
        document.getElementById("mySidemenu").style.minWidth = "300px";
      // The URL changed...
      this.window.removeEventListener("popstate");
    });
    flag = true;
  } else {
    if (flag) {
      document.getElementById("mySidemenu").style.minWidth = null;
      document.getElementById("mySidemenu").style.width = "0px";
    }
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
        {!sideMenuData[0] &&
          <div style={{ textAlign: "center", marginTop: "20px" }}>No Data Available</div>
        }
        {sideMenuData.map(({ main, corpId, sub, deptId }, index) => {
          return (
            <SideMenuData
              key={index}
              main={main}
              sub={sub}
              deptId={deptId}
              corpId={corpId}
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
