import React, { useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import photo from "../../Assets/admin.jpg";

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

const Accordian = (props) => {
  const [isActive, setIsActive] = useState(false);

  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

  function myInitMap() {
    const image =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: { lat: 23.23393, lng: 72.67918 },
      // mapTypeId: "terrain",
    });

    const flightPlanCoordinates = [
      { lat: 23.23233, lng: 72.67878 },
      { lat: 23.23533, lng: 72.67878 },
      { lat: 23.23553, lng: 72.67918 },
      { lat: 23.23293, lng: 72.67918 },
    ];
    const flightPath = new window.google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "blue",
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });

    flightPath.setMap(map);

    const tourStops = [
      [{ lat: 23.23233, lng: 72.67878 }],
      [{ lat: 23.23533, lng: 72.67878 }],
      [{ lat: 23.23553, lng: 72.67918 }],
      [{ lat: 23.23293, lng: 72.67918 }]
    ];
    const infoWindow = new window.google.maps.InfoWindow();
    let icon;
    let label;
    tourStops.forEach(([position], i) => {
      if (i === 0) {
        icon = image;
        label = null;
      }
      else {
        icon = null;
        label = `${i}`;
      }
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: `${i}. ${RIDER_DATA[i].rider_name}`,
        label,
        icon,
        optimized: false,
      });
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });
    });
  }

  window.myInitMap = myInitMap;

  return (
    <React.Fragment>
      <tr onClick={() => setIsActive((prev) => !prev)}>
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
        <td colSpan="7" id={props.id}>
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
                    <tr>
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
