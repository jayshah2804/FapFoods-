import React, { useState, useEffect } from 'react';
import classes from './Main.module.css';
import Chart from 'react-apexcharts';
import photo from '../../Assets/admin.jpg';
import startPoint from "../../Assets/Pin_icon_green50.png";
import studentDummyImage from "../../Assets/new_student_marker.png";
import { useHistory } from 'react-router-dom';
import useHttp from "../../Hooks/use-http";

const DUMMY_DATA = [
  {
    driverName: "Dharmik Gurav",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive"
  },
  {
    driverName: "Mahesh Gohil",
    carNumber: "GJ 01 AA 2343",
    status: "active"
  },
  {
    driverName: "Vivek Zala",
    carNumber: "GJ 01 AA 2343",
    status: "active"
  },
  {
    driverName: "Gautam Solanki",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive"
  },
  {
    driverName: "Ketan Patel",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive"
  },
  {
    driverName: "Gautam Solanki",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive"
  }
];

let divFlag = 0;
const Main = () => {
  // const [options, setOptions] = useState(initial);  
  const [isRender, setIsRender] = useState();
  const [listData, setListData] = useState({});
  const history = useHistory();

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

  const authenticateUser = (data) => {
    let myData = {
      riders: data.Rider,
      routes: data.Route,
      trips: data.Trip,
      activeTrips: data.ActiveTrip
    }
    // console.log(myData);
    setListData(myData);
    // setFilteredData(department_data)
  };

  const { sendRequest } = useHttp();

  useEffect(() => {
    if (divFlag > 0)
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
    divFlag++;
  }, [sendRequest])

  function myInitMap() {
    var map = new window.google.maps.Map(document.getElementById("map-modal"), {
      center: { lat: 23.0225, lng: 72.5714 },
      zoom: 11,
      mapTypeControl: false,
    });

    let myInt = setInterval(() => {
      if (document.getElementsByClassName("gm-control-active")[0]) {
        document.getElementsByClassName("gm-control-active")[0].style.marginTop = "40px";
        clearInterval(myInt);
      }
      if (document.getElementsByClassName("gm-svpc")[0]) {
        document.getElementsByClassName("gm-svpc")[0].style.display = "none";
        clearInterval(myInt);
      }
    })
  }

  window.myInitMap = myInitMap;

  return (
    <div className={classes.container} id="myContainer">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p className={classes.adminName}>Welcome Jay Shah</p>
          <p className={classes.adminText}>You can check all data of your Organization in Dashboard!</p>
        </div>
        <button style={{ height: "35px", alignSelf: "center" }} onClick={() => history.push("/new-registration")} className={classes.newCorpButton}>Add New Corporate</button>
      </div>
      <div className={classes.cards}>
        <div className={classes.text} title="Click to see Monthly Trip details" onClick={() => history.push("/trips")} >
          <p>Trips</p>
          <span>{listData.trips}</span>
        </div>
        <div className={classes.text} title="Click to see Monthly Usage details" onClick={() => history.push("/staff")} >
          <p>Riders</p>
          <span>{listData.riders}</span>
        </div>
        <div className={classes.text} title="Click to see Routes details" onClick={() => history.push("/routes")} >
          <p>Routes</p>
          <span>{listData.routes}</span>
        </div>
        <div className={classes.text} title="Click to see Active Trips details">
          <p>Active Trips</p>
          <span>{listData.activeTrips}</span>
        </div>
      </div>
      {/* <div className={classes.tripChart}>
        <Chart options={options.options} series={options.series} type="line" height={270} className={classes.chart} />
      </div> */}
      <div className={classes.footer}>
        <div className={classes.driverList}>
          <div className={classes.driverListHeader}>
            <p>Driver List</p>
            <p className={classes.viewMoreDriverList}>View All</p>
          </div>
          {DUMMY_DATA.map((ele, index) => {
            return (
              <div key={index}>
                <div className={classes.driverDetails}>
                  <div className={classes.driverInfo}>
                    <img src={photo} alt='' className={classes.driverPhoto} />
                    <div>
                      <p className={classes.driverName}>{ele.driverName}</p>
                      <p className={classes.carNumber}>{ele.carNumber}</p>
                    </div>
                  </div>
                  <div>{ele.status === "active" ? <p className={classes.activeDriver}></p> : <p className={classes.inActiveDriver}></p>}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className={classes.mapContainer}>
          <div id="map-modal" className={classes.map}></div>
          <div className={classes.mapText}>Live Trip Tracker</div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Main);

// function distance(lat1,
    //   lat2, lon1, lon2) {

    //   // The math module contains a function
    //   // named toRadians which converts from
    //   // degrees to radians.
    //   lon1 = lon1 * Math.PI / 180;
    //   lon2 = lon2 * Math.PI / 180;
    //   lat1 = lat1 * Math.PI / 180;
    //   lat2 = lat2 * Math.PI / 180;

    //   // Haversine formula
    //   let dlon = lon2 - lon1;
    //   let dlat = lat2 - lat1;
    //   let a = Math.pow(Math.sin(dlat / 2), 2)
    //     + Math.cos(lat1) * Math.cos(lat2)
    //     * Math.pow(Math.sin(dlon / 2), 2);

    //   let c = 2 * Math.asin(Math.sqrt(a));

    //   // Radius of earth in kilometers. Use 3956
    //   // for miles
    //   let r = 6371;

    //   // calculate the result
    //   return (c * r * 1000);
    // }