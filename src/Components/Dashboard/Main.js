import React, { useState, useEffect } from "react";
import classes from "./Main.module.css";
import Chart from "react-apexcharts";
import photo from "../../Assets/admin.jpg";
import startPoint from "../../Assets/Pin_icon_green50.png";
import studentDummyImage from "../../Assets/new_student_marker.png";
import { useHistory } from "react-router-dom";
import useHttp from "../../Hooks/use-http";
import Loading from "../../Loading/Loading";
// import studentDummyImage from "../../Assets/new_student_marker.png";


const DUMMY_DATA = [
  {
    driverName: "Dharmik Gurav",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive",
  },
  {
    driverName: "Mahesh Gohil",
    carNumber: "GJ 01 AA 2343",
    status: "active",
  },
  {
    driverName: "Vivek Zala",
    carNumber: "GJ 01 AA 2343",
    status: "active",
  },
  {
    driverName: "Gautam Solanki",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive",
  },
  {
    driverName: "Ketan Patel",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive",
  },
  {
    driverName: "Gautam Solanki",
    carNumber: "GJ 01 AA 2343",
    status: "Inactive",
  },
];

let divFlag = 0;
const Main = () => {
  // const [options, setOptions] = useState(initial);
  const [isRender, setIsRender] = useState();
  const [listData, setListData] = useState({});
  const [isApiError, setIsApiError] = useState();
  const history = useHistory();

  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

  const authenticateUser = (data) => {
    console.log(data);
    if (data === "Request failed!") {
      setIsApiError("No data available");
    } else {
      let myData = {
        riders: data.Rider,
        routes: data.Route,
        trips: data.Trip,
        activeTrips: data.ActiveTrip,
      };
      // console.log(myData);
      setListData(myData);
    }
    // setFilteredData(department_data)
  };

  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    if (divFlag > 0)
      sendRequest(
        {
          url: "/api/v1/Dashboard/GetDashboard",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            emailID: sessionStorage.getItem("user"),
          },
        },
        authenticateUser
      );
    divFlag++;
  }, [sendRequest]);

  function myInitMap() {
    // var map = new window.google.maps.Map(document.getElementById("map-modal"), {
    //   center: { lat: 23.0225, lng: 72.5714 },
    //   zoom: 11,
    //   disableDefaultUI: true,
    //   fullscreenControl: true,
    //   zoomControl: true
    // });

    // let myInt = setInterval(() => {
    //   if (document.getElementsByClassName("gm-control-active")[0]) {
    //     document.getElementsByClassName(
    //       "gm-control-active"
    //     )[0].style.marginTop = "40px";
    //     clearInterval(myInt);
    //   }
    // });
    // INSTANTIATE MAP
    const map = new window.google.maps.Map(document.getElementById("map-modal"), {
      // center: new window.google.maps.LatLng(23.0225, 72.5714),
      // zoom: 13,
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 },
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    });
    //DEFINE THE POLYLINE
    const polyline = new window.google.maps.Polyline({
      path: [],
      // geodesic: true,
      strokeColor: '#397273',
      strokeOpacity: 10.0,
      strokeWeight: 5
    });

    //DIRECTION SERVICE
    let directionsService = new window.google.maps.DirectionsService();
    let directionsRenderer = new window.google.maps.DirectionsRenderer();
    // let directionsRenderer = new window.google.maps.DirectionsRenderer({
    //   polylineOptions: polyline, suppressMarkers: true
    // });

    directionsRenderer.setMap(map);

    const request = {
      origin: "Halifax, NS", //Eximious
      destination: "Boston, MA", //LD
      // origin: { lat: parseFloat(23.0448498), lng: parseFloat(72.52949269999999) }, //Eximious
      // destination: { lat: parseFloat(23.0338), lng: parseFloat(72.546584) }, //LD
      waypoints: [
        {
          location: "toronto, ont",
          stopover: true
        },
        // {
        //   location: new window.google.maps.LatLng(23.0264486, 72.5555701), //KP
        //   stopover: true
        // }
      ],
      travelMode: window.google.maps.TravelMode.DRIVING
    }

    const waypts = [];
    // waypts.push(
    //   {
    //     location: "calgary, ab",
    //     stopover: true
    //   });

    directionsService
      .route({
        origin: "San Francisco, CA",
        destination: "Halifax, NS",
        waypoints: waypts,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        // const route = response.routes[0].leg[0];
        var leg = response.routes[0].legs[0];

        new window.google.maps.Marker({
          position: leg.start_location,
          map: map,
          icon: studentDummyImage,
          title: 'start'
        })
        // const summaryPanel = document.getElementById("directions-panel");

        // summaryPanel.innerHTML = "";

        // // For each route, display summary information.
        // for (let i = 0; i < route.legs.length; i++) {
        //   const routeSegment = i + 1;

        //   summaryPanel.innerHTML +=
        //     "<b>Route Segment: " + routeSegment + "</b><br>";
        //   summaryPanel.innerHTML += route.legs[i].start_address + " to ";
        //   summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
        //   summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
        // }
      })
    // .catch((e) => window.alert("Directions request failed due to "));


    // directionsService.route(request, function (response, status) {
    //   if (status == window.google.maps.DirectionsStatus.OK) {

    //     directionsRenderer.setDirections(response); // Add route to the map
    //     console.log(response.routes[0]);

    //     var leg = response.routes[0];

    //     new window.google.maps.Marker({
    //       position: leg.start_location,
    //       map: map,
    //       icon: studentDummyImage,
    //       title: 'start'
    //     })
    //   }
    // });

    // 23.0371184 72.5489122


  }

  window.myInitMap = myInitMap;

  return (
    <div className={classes.container} id="myContainer">
      <header>
        <div>
          <p className={classes.adminName}>Welcome Jay Shah</p>
          <p className={classes.adminText}>
            You can check all data of your Organization in Dashboard!
          </p>
        </div>
        <button
          onClick={() => history.push("/new-registration")}
          className={classes.newCorpButton}
        >
          Add New Corporate
        </button>
      </header>
      <div className={classes.cards}>
        <div
          className={classes.text}
          title="Click to see Monthly Trip details"
          onClick={() => history.push("/trips")}
        >
          <p>Trips</p>
          {isApiError && (
            <span style={{ fontWeight: "normal", fontSize: "14px" }}>
              {isApiError}
            </span>
          )}
          {!isApiError && (
            <span>
              {isLoading ? <Loading /> : <span>{listData.trips}</span>}
            </span>
          )}
        </div>
        <div
          className={classes.text}
          title="Click to see Monthly Usage details"
          onClick={() => history.push("/staff")}
        >
          <p>Riders</p>
          {isApiError && (
            <span style={{ fontWeight: "normal", fontSize: "14px" }}>
              {isApiError}
            </span>
          )}
          {!isApiError && (
            <span>
              {isLoading ? <Loading /> : <span>{listData.riders}</span>}
            </span>
          )}
        </div>
        <div
          className={classes.text}
          title="Click to see Routes details"
          onClick={() => history.push("/routes")}
        >
          <p>Routes</p>
          {isApiError && (
            <span style={{ fontWeight: "normal", fontSize: "14px" }}>
              {isApiError}
            </span>
          )}
          {!isApiError && (
            <span>
              {isLoading ? <Loading /> : <span>{listData.routes}</span>}
            </span>
          )}
        </div>
        <div className={classes.text} title="Click to see Active Trips details">
          <p>Active Trips</p>
          {isApiError && (
            <span style={{ fontWeight: "normal", fontSize: "14px" }}>
              {isApiError}
            </span>
          )}
          {!isApiError && (
            <span>
              {isLoading ? <Loading /> : <span>{listData.activeTrips}</span>}
            </span>
          )}
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
                    <img src={photo} alt="" className={classes.driverPhoto} />
                    <div>
                      <p className={classes.driverName}>{ele.driverName}</p>
                      <p className={classes.carNumber}>{ele.carNumber}</p>
                    </div>
                  </div>
                  <div>
                    {ele.status === "active" ? (
                      <p className={classes.activeDriver}></p>
                    ) : (
                      <p className={classes.inActiveDriver}></p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes.mapContainer}>
          <div id="map-modal" className={classes.map}></div>
          <div className={classes.mapText}>Live Trip Tracker</div>
        </div>
      </div>
    </div>
  );
};

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