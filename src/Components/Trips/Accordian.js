import React, { useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import photo from "../../Assets/admin.jpg";

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
    id: 3,
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
    id: 4,
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
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 23.23233, lng: 72.87878 },
      zoom: 10,
      mapTypeControl: false,
    });
  }
  window.myInitMap = myInitMap;

  return (
    <React.Fragment>
      <tr
        style={{ cursor: "pointer" }}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <td style={{ display: "flex", gap: "5px", marginLeft: "5px" }}>
          <img
            src={photo}
            alt=""
            style={{
              width: "35px",
              height: "35px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{props.driver_name}</p>
            <p className="car-info">{props.car_info}</p>
          </div>
        </td>
        <td>{props.journey_id} </td>
        <td>{props.trip_date} </td>
        <td>{props.pickup_time} </td>
        <td>{props.drop_time} </td>
        <td>{props.total_trip_time} </td>
        <td>
          {props.total_trip_km}{" "}
          {isActive ? (
            <MdArrowDropDown className="toggle-icon" />
          ) : (
            <MdArrowRight className="toggle-icon" />
          )}{" "}
        </td>
      </tr>
      {isActive && (
        <td colspan="7" id={props.id}>
          <div id="map"></div>
          <table className="sub-table">
            <tr>
              {RIDER_TITLE.map((data) => (
                <th>{data}</th>
              ))}
            </tr>
            {RIDER_DATA.map((data) => {
              return (
                <tr>
                  <td style={{ display: "flex" }}>
                    <img
                      src={photo}
                      alt=""
                      style={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
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
          </table>
        </td>
      )}
    </React.Fragment>
  );
};

export default Accordian;
