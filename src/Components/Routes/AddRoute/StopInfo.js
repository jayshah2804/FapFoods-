import React, { useState } from 'react';
import "./StopInfo.css";

import startPoint from "../../../Assets/Pin_icon_green50.png";
import studentDummyImage from "../../../Assets/new_student_marker.png";

let studentCount = 0;
let shuttleSeatingCapacity = 4;
let myRecord = "";
let previewRouteFlag = false;
let prev_id;
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

let flightPlanCoordinates = [
  { lat: RIDER_DATA[0].location.lat, lng: RIDER_DATA[0].location.lng },
];

const StopInfo = (props) => {
  const [isRender, setIsRender] = useState();

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

  const undoRouteClickHandler = () => {
    if (flightPlanCoordinates.length > 1) {
      studentCount -= RIDER_DATA[prev_id].name.length;
      flightPlanCoordinates.pop();
      RIDER_DATA[myRecord].status = false;
      setIsRender(prev => !prev);
    }
  }

  const resetRouteClickHandler = () => {
    let response = window.confirm("It will reset all the routes created. Want to reset?");
    if (response) {
      studentCount = 0;
      flightPlanCoordinates = [flightPlanCoordinates[0]];
      RIDER_DATA.map(data => data.status = false);
      setIsRender(prev => !prev);
    }
  }

  const previewClickHandler = () => {
    if (flightPlanCoordinates.length > 1) {
      previewRouteFlag = true;
      flightPlanCoordinates.push(flightPlanCoordinates[0]);
    }
    setIsRender(prev => !prev);
  }

  function myInitMap() {
    // var map = new window.google.maps.Map(document.getElementById("map-modal"), {
    //   center: { lat: 23.0225, lng: 72.5714 },
    //   zoom: 11,
    //   mapTypeControl: false,
    // });
    const map = new window.google.maps.Map(document.getElementById("stops-map"), {
      zoom: 12,
      center: { lat: RIDER_DATA[Math.round(RIDER_DATA.length / 2)].location.lat, lng: RIDER_DATA[Math.round(RIDER_DATA.length / 2)].location.lng },
      disableDefaultUI: true,
      fullscreenControl: true,
      zoomControl: true
    });

    const infoWindow = new window.google.maps.InfoWindow();
    let icon;
    let myTitle;

    const flightPath1 = new window.google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "black",
      strokeOpacity: 1.0,
      strokeWeight: 7,
    });

    const flightPath = new window.google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "rgba(34, 137, 203, 255)",
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });

    flightPath1.setMap(map);
    flightPath.setMap(map);

    const assignButtonClickHandler = (e) => {
      prev_id = e.target.parentElement.id;
      studentCount += RIDER_DATA[e.target.parentElement.id].name.length;
      if (studentCount > shuttleSeatingCapacity) {
        studentCount -= RIDER_DATA[e.target.parentElement.id].name.length;
        alert("Shuttle seating capacity exceeded");
      }
      else {
        if (previewRouteFlag) {
          flightPlanCoordinates.pop();
          previewRouteFlag = false;
        }
        RIDER_DATA[e.target.parentElement.id].status = true;
        myRecord = e.target.parentElement.id;
        flightPlanCoordinates.push(
          {
            lat: RIDER_DATA[e.target.parentElement.id].location.lat,
            lng: RIDER_DATA[e.target.parentElement.id].location.lng
          });
        // if(+e.target.parentElement.id === (RIDER_DATA.length - 1)){
        //   flightPlanCoordinates.push(RIDER_DATA[0].location);
        // }
        setIsRender(prev => !prev);
      }
    }

    RIDER_DATA.forEach((position, i) => {
      if (i === 0) {
        icon = startPoint;
        myTitle = `<div><h3>${position.name.toString()}</h3></div>`;
      }
      else {
        icon = studentDummyImage;
        if (position.status)
          myTitle = `<div id="infowindow-container" ><h3>${position.name.toString()}</h3><p id="infowindow-success">Assigned</div>`;
        else
          myTitle = `<div id="infowindow-container" ><h3>${position.name.toString()}</h3><div id=${i}><span id='infowindow-assign'>Assign rider</span></div></div>`;
      }

      const marker = new window.google.maps.Marker({
        position: position.location,
        map,
        myTitle,
        icon,
        optimized: false,
      });

      marker.addListener("mouseover", () => {
        // infoWindow.close();
        infoWindow.setContent(marker.myTitle);
        infoWindow.open(marker.getMap(), marker);
        infoWindow.open(
          setTimeout(() => {
            document.getElementById("infowindow-assign").addEventListener('click', assignButtonClickHandler)
          })
        );
      });
    });
  }

  window.myInitMap = myInitMap;

  const backClickHandler = () => {
    props.backWizard("StopInfo");
    props.setIsDepartmentChanged(false);
  }
  const submitClickHandler = () => {
    props.nextWizard("Submit");
    props.setIsAddRouteClicked(false);
  }
  return (
    <div className='stopInfo-container'>
      <div className='sub-header'>
        <p>Select stops for the route</p>
        <span>Shuttle capacity: {shuttleSeatingCapacity}</span>
      </div>
      <div className='route-operation'>
        <span onClick={undoRouteClickHandler}>Undo route operation</span>
        <span onClick={resetRouteClickHandler}>Reset route</span>
      </div>
      <div id="stops-map"></div>
      <div className='footer'>
        <button className='preview' onClick={previewClickHandler} >Preview Route</button>
        <div style={{ display: "flex", gap: "15px" }}>
          <button className='back' onClick={backClickHandler}>Back</button>
          <button className='next' onClick={submitClickHandler}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default StopInfo;