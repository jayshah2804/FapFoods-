import React, { useState } from 'react';
import classes from './Main.module.css';
import Chart from 'react-apexcharts';
import photo from '../../Assets/admin.jpg';
import startPoint from "../../Assets/Pin_icon_green50.png";
import studentDummyImage from "../../Assets/new_student_marker.png";
import { useHistory } from 'react-router-dom';

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

const initial = {
  series: [{
    name: "No. of Trips",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  }],
  options: {
    chart: {
      background: "#fff",
      height: 200,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: true,
        tools: {
          download: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["rgba(42,149,69,255)"],
    markers: {
      size: [6]
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    title: {
      text: 'Monthly Trips',
      align: 'left',
      // margin: 20
    },
    // grid: {
    //   row: {
    //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    //     opacity: 0.5
    //   },
    // },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      title: {
        text: "No. of Trips"
      }
    },
    // background: {
    //   enabled: true,
    //   borderRadius: 20
    // }
  },
};

const RIDER_DATA = [
  {
    name: ["S.S. Divine School"],
    location: { lat: 23.020922774165125, lng: 72.46970495605471 }
  },
  {
    name: ["Jay Shah", "Darshan Patel"],
    location: { lat: 23.015234991655756, lng: 72.51416525268557 },
    status: false
  },
  {
    name: ["Dev Shah", "Vijay Kansara"],
    location: { lat: 22.993429603752258, lng: 72.5378545227051 },
    status: false
  },
  {
    name: ["Het Desai"],
    location: { lat: 23.034509283424683, lng: 72.55879721069338 },
    status: false
  },
  {
    name: ["Roshan Patel"],
    location: { lat: 23.03489120423814, lng: 72.56658725087891 },
    status: false
  },
  {
    name: ["Nihar Gupte"],
    location: { lat: 23.04272371760406, lng: 72.53682455444338 },
    status: false
  },
  {
    name: ["Vinay Joshi"],
    location: { lat: 23.006702868171974, lng: 72.53030142211917 },
    status: false
  },
];

const flightPlanCoordinates = [
  { lat: RIDER_DATA[0].location.lat, lng: RIDER_DATA[0].location.lng },
];

const Main = () => {
  // const [options, setOptions] = useState(initial);  
  const [isRender, setIsRender] = useState();
  const history = useHistory();

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

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
      <p className={classes.adminName}>Welcome Jay Shah</p>
      <p className={classes.adminText}>You can check all data of your Organization in Dashboard!</p>
      <div className={classes.cards}>
        <div className={classes.text} title="Click to see Monthly Trip details" onClick={() => history.push("/trips")} >
          <p>Trips</p>
          <span>328</span>
        </div>
        <div className={classes.text} title="Click to see Monthly Usage details">
          <p>Riders</p>
          <span>82</span>
        </div>
        <div className={classes.text} title="Click to see Routes details" onClick={() => history.push("/routes")} >
          <p>Routes</p>
          <span>4</span>
        </div>
        <div className={classes.text} title="Click to see Active Trips details">
          <p>Active Trips</p>
          <span>2</span>
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