import React, { useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import photo from "../../Assets/admin.jpg";

import studentDropImage from "../../Assets/student_dummy_photo.png";
// import studentDummyImage from "../../Assets/student_dummy_photo.png";
import studentDummyImage from "../../Assets/new_student_marker.png";
import startPoint from "../../Assets/Pin_icon_green50.png";
import endPoint from "../../Assets/Pin_icon50.png";

import classes from "./Accordian.module.css";

const RIDER_TITLE = [
  "Rider Name",
  "Pickup Location",
  "Shuttle Arrival Time",
  "Boarding Time",
  "Boarding (Lat Lng )",
  "Drop Location",
  "Alighting Time",
  "Aligthing (Lat Lng)",
];

const RIDER_DATA = [
  {
    id: 1,
    rider_name: "Deep Parmar",
    pickup_location: "A/4 Kuldeep Apartment, Maninagar, East",
    shuttle_arrival_time: "5:21 PM",
    boarding_time: "5:24 PM",
    boarding_lat_lng: "23.676763,72.878787",
    drop_location: "A/4 Kuldeep Apartment, Maninagar, East",
    alighting_time: "07:00",
    alighting_lat_lng: "23.7878787,72.8778787",
  },
  {
    id: 2,
    rider_name: "Jay Shah",
    pickup_location: "A/4 Kuldeep Apartment, Maninagar, East",
    shuttle_arrival_time: "5:21 PM",
    boarding_time: "5:24 PM",
    boarding_lat_lng: "23.676763,72.878787",
    drop_location: "A/4 Kuldeep Apartment, Maninagar, East",
    alighting_time: "07:00",
    alighting_lat_lng: "23.7878787,72.8778787",
  },
  {
    id: 3,
    rider_name: "Rahul Patel",
    pickup_location: "A/4 Kuldeep Apartment, Maninagar, East",
    shuttle_arrival_time: "5:21 PM",
    boarding_time: "5:24 PM",
    boarding_lat_lng: "23.676763,72.878787",
    drop_location: "A/4 Kuldeep Apartment, Maninagar, East",
    alighting_time: "07:00",
    alighting_lat_lng: "23.7878787,72.8778787",
  },
  {
    id: 4,
    rider_name: "Vishwas Parmar",
    pickup_location: "A/4 Kuldeep Apartment, Maninagar, East",
    shuttle_arrival_time: "5:21 PM",
    boarding_time: "5:24 PM",
    boarding_lat_lng: "23.676763,72.878787",
    drop_location: "A/4 Kuldeep Apartment, Maninagar, East",
    alighting_time: "07:00",
    alighting_lat_lng: "23.7878787,72.8778787",
  },
  {
    id: 5,
    rider_name: "Deep Parmar",
    pickup_location: "A/4 Kuldeep Apartment, Maninagar, East",
    shuttle_arrival_time: "5:21 PM",
    boarding_time: "5:24 PM",
    boarding_lat_lng: "23.676763,72.878787",
    drop_location: "A/4 Kuldeep Apartment, Maninagar, East",
    alighting_time: "07:00",
    alighting_lat_lng: "23.7878787,72.8778787",
  },
];


let parent_prev_id;
let prev_active_status;
const Accordian = (props) => {
  const [isActive, setIsActive] = useState(false);

  const myInterval = setInterval(() => {
    if (document.getElementsByClassName("gm-svpc")[0])
      document.getElementsByClassName("gm-svpc")[0].style.display = "none";
    if (document.getElementsByClassName("gm-style-mtc")[0]) {
      document.getElementsByClassName("gm-style-mtc")[0].style.display = "none";
      document.getElementsByClassName("gm-style-mtc")[1].style.display = "none";
      clearInterval(myInterval);
    }
  }, 100);

  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

  function myInitMap() {
    const image =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: 23.03489120423814, lng: 72.56658725087891 },
      // mapTypeId: "terrain",
    });

    const flightPlanCoordinates = [
      { lat: 23.037569650831212, lng: 72.55877665822754},
      { lat: 23.03489120423814, lng: 72.56658725087891 },
      { lat: 23.03248207530169, lng: 72.56562165563355 },
      { lat: 23.032583894197987, lng: 72.56023406982422 },
    ];

    const flightPath = new window.google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "blue",
      strokeOpacity: 0.9,
      strokeWeight: 6,
    });

    flightPath.setMap(map);

    const tourStops = [
      [{ lat: 23.037569650831212, lng: 72.55877665822754 }],
      [{ lat: 23.03489120423814, lng: 72.56658725087891 }],
      [{ lat: 23.03248207530169, lng: 72.56562165563355 }],
      [{ lat: 23.032583894197987, lng: 72.56023406982422 }],
      [{ lat: 23.032583894197987, lng: 72.56023406982423 }]
    ];

    const infoWindow = new window.google.maps.InfoWindow();
    let icon;
    let myTitle;
    // const myImage = {
    //   url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    //   // url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5t9xxQSxtcsppMb9apHlsWTIZO6KAGL-7OA&usqp=CAU",
    //   size: new window.google.maps.Size(20, 32),
    //   origin: new window.google.maps.Point(0, 0),
    //   anchor: new window.google.maps.Point(0, 32),
    // }
    tourStops.forEach(([position], i) => {
      if (i === 0) {
        icon = startPoint;
        myTitle = `<div><h3>S.S Divine School</h3></div>`;
      }
      else {
        icon = studentDummyImage;
        myTitle = `<div id="infowindow-container" ><img src=${studentDropImage} id="dummy-student-image" /><h3>${RIDER_DATA[i-1].rider_name}</h3></div>`;
      }
      if(i === RIDER_DATA.length - 1) {
        icon = endPoint;
      }

      const marker = new window.google.maps.Marker({
        position,
        map,
        myTitle,
        icon,
        optimized: false,
      });
      
      marker.addListener("mouseover", () => {
        console.log(marker);
        infoWindow.close();
        infoWindow.setContent(marker.myTitle);
        infoWindow.open(marker.getMap(), marker);
      });
      // document.getElementById("myHandler").addEventListener("click", () => {
      //   infoWindow.setPosition([{ lat: 23.037569650831212, lng: 72.55877665822754 }]);
      //   infoWindow.setContent("Jay Shah");
      //   infoWindow.open(marker.getMap(), marker);
      // })
    }); 
  }

  window.myInitMap = myInitMap;

  const tableRowClickHandler = (e) => {
    if (parent_prev_id !== e.target.parentElement.id && !prev_active_status)
      props.formyRender(parent_prev_id);
    setIsActive(prev => !prev);
    parent_prev_id = e.target.parentElement.id;
    prev_active_status = isActive;
  }

  return (
    <React.Fragment>
      <tr onClick={tableRowClickHandler} id={props.id + "tr"} >
        <td>
          <div className={classes.driverInfo} >
            <img
              src={photo}
              alt=""
              className={classes.driverPhoto}
            />
            <div className={classes.div}>
              <p>{props.driver_name}</p>
              <p className={classes.carInfo}>{props.car_info}</p>
            </div>
          </div>
        </td>
        <td>{props.journey_id} </td>
        <td>{props.trip_date} </td>
        <td>{props.pickup_time} </td>
        <td>{props.drop_time} </td>
        <td>{props.total_trip_time} </td>
        <td className={classes.totalTrip}>
          {props.total_trip_km}{" "}
          {isActive ? (
            <MdArrowDropDown className={classes.toggleIcon} />
          ) : (
            <MdArrowRight className={classes.toggleIcon} />
          )}{" "}
        </td>
      </tr>
      {isActive && (
        <td colSpan="7">
          <div id="map"></div>
          <div className={classes.rideTableContainer}>
            <table className={classes.riderTable}>
              <tr>
                {RIDER_TITLE.map((data) => (
                  <th>{data}</th>
                ))}
              </tr>
              <tbody>
                {RIDER_DATA.map((data) => {
                  return (
                    <tr id="myHandler">
                      <td className={classes.riderName} >
                        <img src={photo} alt="" />
                        <p>{data.rider_name}</p>
                      </td>
                      <td>{data.pickup_location} </td>
                      <td>{data.shuttle_arrival_time} </td>
                      <td>{data.boarding_time} </td>
                      <td>{data.boarding_lat_lng} </td>
                      <td>{data.drop_location} </td>
                      <td>{data.alighting_time} </td>
                      <td>{data.alighting_lat_lng} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </td>
      )}
    </React.Fragment>
  );
};

export default Accordian;
