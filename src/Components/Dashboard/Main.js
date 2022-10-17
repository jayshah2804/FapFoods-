import React, { useState } from 'react';
import classes from './Main.module.css';
import Chart from 'react-apexcharts';
import photo from '../../Assets/admin.jpg';

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

const Main = () => {
  const [options, setOptions] = useState(initial);

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

  function myInitMap() {
    var map = new window.google.maps.Map(document.getElementById("map-modal"), {
      center: { lat: 23.0225, lng: 72.5714 },
      zoom: 13,
      mapTypeControl: false,
    });

    let myInt = setInterval(() => {
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
        <div className={classes.text} title="Click to see Monthly Trip details">
          <p>Monthly Trips</p>
          <span>328</span>
        </div>
        <div className={classes.text} title="Click to see Monthly Usage details">
          <p>Monthly Usage</p>
          <span>821.23</span>
        </div>
        <div className={classes.text} title="Click to see Routes details">
          <p>Routes</p>
          <span>4</span>
        </div>
        <div className={classes.text} title="Click to see Active Trips details">
          <p>Active Trips</p>
          <span>2</span>
        </div>
      </div>
      <div className={classes.tripChart}>
        <Chart options={options.options} series={options.series} type="line" height={270} className={classes.chart} />
      </div>
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

export default Main;