import React, { useState } from 'react';
import "./StopInfo.css";

import startPoint from "../../../Assets/Pin_icon_green50.png";
import studentDummyImage from "../../../Assets/new_student_marker.png";
import connectionPoint from "../../../Assets/start_location.png";
import threedots from "../../../Assets/route_3dots.png";
import endPoint from "../../../Assets/place_outline.png";

let studentCount = 0;
let shuttleSeatingCapacity = 4;
let myRecord = [];
let previewRouteFlag = false;
let prev_id;
let myFlag = true;
let indexToBeMove;
let indexToBeShift;
const RIDER_DATA = [
  {
    stop: "S.S. Divine School",
    name: ["S.S. Divine School"],
    location: { lat: 23.020922774165125, lng: 72.46970495605471 }
  },
  {
    stop: "Divya Bhaskar Office",
    name: ["Jay Shah"],
    location: { lat: 23.015234991655756, lng: 72.51416525268557 },
    status: false
  },
  {
    stop: "Divya Bhaskar Office",
    name: ["Darshan Patel"],
    location: { lat: 23.015234991655756, lng: 72.51416525268557 },
    status: false
  },
  {
    stop: "JEEP Ahmedabad",
    name: ["Dev Shah", "Vijay Kansara"],
    location: { lat: 22.993429603752258, lng: 72.5378545227051 },
    status: false
  },
  {
    stop: "L.D. College of Engineering",
    name: ["Het Desai"],
    location: { lat: 23.034509283424683, lng: 72.55879721069338 },
    status: false
  },
  {
    stop: "Vishala Circle",
    name: ["Roshan Patel"],
    location: { lat: 23.03489120423814, lng: 72.56658725087891 },
    status: false
  },
  {
    stop: "Navarangpura Circle",
    name: ["Nihar Gupte"],
    location: { lat: 23.04272371760406, lng: 72.53682455444338 },
    status: false
  },
  {
    stop: "Naherunagar Circle",
    name: ["Vinay Joshi"],
    location: { lat: 23.006702868171974, lng: 72.53030142211917 },
    status: false
  },
];

let STOP_DETAILS = [
  {
    stopName: RIDER_DATA[0].stop
  }
]
let flightPlanCoordinates = [
  { lat: RIDER_DATA[0].location.lat, lng: RIDER_DATA[0].location.lng },
];

const StopInfo = (props) => {
  const [filteredData, setFilteredData] = useState(RIDER_DATA);
  const [isRender, setIsRender] = useState();

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
  script.async = true;
  document.body.appendChild(script);

  const undoRouteClickHandler = () => {
    if (flightPlanCoordinates.length > 1) {
      // studentCount -= filteredData[prev_id].name.length;
      flightPlanCoordinates.pop();
      STOP_DETAILS.pop();
      // filteredData[myRecord].status = false;
      filteredData[myRecord[myRecord.length - 1]].status = false;
      myRecord.pop();
      setIsRender(prev => !prev);
    }
  }

  const resetRouteClickHandler = () => {
    let response = window.confirm("It will reset all the routes created. Want to reset?");
    if (response) {
      // studentCount = 0;
      flightPlanCoordinates = [flightPlanCoordinates[0]];
      STOP_DETAILS = [{ stopName: RIDER_DATA[0].stop }];
      filteredData.map(data => data.status = false);
      myRecord = [];
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
      center: { lat: filteredData[Math.round(filteredData.length / 2)].location.lat, lng: filteredData[Math.round(filteredData.length / 2)].location.lng },
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
      // studentCount += filteredData[e.target.parentElement.id].name.length;
      // if (studentCount > shuttleSeatingCapacity) {
      //   studentCount -= filteredData[e.target.parentElement.id].name.length;
      //   alert("Shuttle seating capacity exceeded");
      // }
      // else {
        if (previewRouteFlag) {
          flightPlanCoordinates.pop();
          previewRouteFlag = false;
        }
        filteredData[e.target.parentElement.id].status = true;
        // myRecord = e.target.parentElement.id;
        myRecord.push(e.target.parentElement.id);
        flightPlanCoordinates.push(
          {
            lat: filteredData[e.target.parentElement.id].location.lat,
            lng: filteredData[e.target.parentElement.id].location.lng
          });
        // if(+e.target.parentElement.id === (RIDER_DATA.length - 1)){
        //   flightPlanCoordinates.push(RIDER_DATA[0].location);
        // }
        STOP_DETAILS.push({
          stopName: filteredData[e.target.parentElement.id].stop,
          riders: filteredData[e.target.parentElement.id].name
        })
        // console.log(STOP_DETAILS);
        setTimeout(() => {
          document.getElementById("asdf").click();
        })
        setIsRender(prev => !prev);
      // }
    }

    filteredData.forEach((position, i) => {
      if (i === 0) {
        icon = startPoint;
        myTitle = `<div><h3>${position.name.toString()}</h3></div>`;
      }
      else {
        icon = studentDummyImage;
        if (position.status)
          // myTitle = `<div id="infowindow-container" ><h3>${position.name.toString()}</h3><p id="infowindow-success">Assigned</div>`;
          myTitle = `<div id="infowindow-container" ><h3>${position.stop.toString()}</h3><p id="infowindow-success">Assigned</div>`;
        else
          // myTitle = `<div id="infowindow-container" ><h3>${position.name.toString()}</h3><div id=${i}><span id='infowindow-assign'>Assign rider</span></div></div>`;
          myTitle = `<div><div id="infowindow-container" ><h3>${position.stop.toString()}</h3><div id=${i}><span id='infowindow-assign'>Assign riders</span></div></div><div>${position.name.toString()}</div></div>`;
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

  if (myFlag) {
    let arr = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (arr.includes(filteredData[i].stop)) {
        // alert("here");
        filteredData[i - 1].name.push(filteredData[i].name.toString());
        filteredData.splice(i, 1);
      }
      arr.push(filteredData[i].stop);
    }
    myFlag = false;
  }

  const crossClickHandler = (e, targetIndex) => {
    if (targetIndex) {
      for (let i = 0; i < filteredData.length; i++) {
        if (filteredData[i].stop === STOP_DETAILS[targetIndex].stopName)
          filteredData[i].status = false;
      }
      STOP_DETAILS.splice(targetIndex, 1);
      flightPlanCoordinates.splice(targetIndex, 1);
    } else {
      let holdingIndex = 0;
      let presentIndex = 0;
      for (let i = 0; i < STOP_DETAILS.length; i++) {
        if (STOP_DETAILS[i].stopName !== e.target.parentNode.children[0].innerText) {
          STOP_DETAILS[holdingIndex] = STOP_DETAILS[i];
          holdingIndex++;
        } else presentIndex = i;
      }

      for (let i = 0; i < filteredData.length; i++) {
        if (filteredData[i].stop === e.target.parentNode.children[0].innerText)
          filteredData[i].status = false;
      }
      STOP_DETAILS.length = holdingIndex;
      flightPlanCoordinates.splice(presentIndex, 1);
    }
    // console.log(filteredData);
    setIsRender(prev => !prev);
  };
  const subCrossClickHandler = (e) => {
    let targetIndex = 0;
    for (let i = 0; i < STOP_DETAILS.length; i++) {
      // console.log(STOP_DETAILS[i].riders);
      // console.log(e.target.parentNode.children[0].innerText);
      if (STOP_DETAILS[i].riders?.includes(e.target.parentNode.children[0].innerText)) {
        targetIndex = i;
      }
    }

    let holdingIndex = 0;
    if (STOP_DETAILS[targetIndex].riders.length > 1) {
      for (let i = 0; i < STOP_DETAILS[targetIndex].riders.length; i++) {
        if (STOP_DETAILS[targetIndex].riders[i] !== e.target.parentNode.children[0].innerText) {
          STOP_DETAILS[targetIndex].riders[holdingIndex] = STOP_DETAILS[targetIndex].riders[i];
          holdingIndex++;
        }
      }
      STOP_DETAILS = structuredClone(STOP_DETAILS);
      STOP_DETAILS[targetIndex].riders.length = holdingIndex;

      for (let i = 0; i < filteredData.length; i++) {
        if (filteredData[i].stop === e.target.parentNode.children[0].innerText)
          filteredData[i].status = false;
      }
      // console.log(STOP_DETAILS);
      // console.log(RIDER_DATA);
      setIsRender(prev => !prev);
    } else {
      crossClickHandler(null, targetIndex);
    }
  };

  function slist(target) {
    let items = target.getElementsByTagName("li");
    let current = null;

    for (let i = 1; i < items.length; i++) {
      items[i].ondragstart = (ev) => {
        current = items[i];
        items[i].classList.add("my");
      };
      items[i].ondragover = (evt) => { evt.preventDefault(); };

      items[i].ondragend = () => {
        for (let it of items) {
          it.classList.remove("my");
        }
      };

      items[i].ondrop = (evt) => {
        evt.preventDefault();
        items[i].classList.remove("my");

        if (items[i] != current) {
          let currentpos = 0, droppedpos = 0;
          for (let it = 0; it < items.length; it++) {
            if (current == items[it]) { currentpos = it; }
            if (items[i] == items[it]) { droppedpos = it; }
          }
          // console.log(current, items[i]);
          STOP_DETAILS.map((data, index) => {
            if (data.stopName === document.getElementById(current.id).innerText)
              indexToBeMove = index;
            if (data.stopName === document.getElementById(items[i].id).innerText)
              indexToBeShift = index;
          })
          if (currentpos < droppedpos) {
            // items[i].parentNode.insertBefore(current, items[i].nextSibling);
            STOP_DETAILS.splice(+indexToBeShift + 1, 0, STOP_DETAILS[indexToBeMove]);
            STOP_DETAILS.splice(indexToBeMove, 1);
            flightPlanCoordinates.splice(indexToBeShift + 1, 0, flightPlanCoordinates[indexToBeMove]);
            flightPlanCoordinates.splice(indexToBeMove, 1);
          } else {
            // items[i].parentNode.insertBefore(current, items[i]);
            STOP_DETAILS.splice(indexToBeShift, 0, STOP_DETAILS[indexToBeMove]);
            STOP_DETAILS.splice(+indexToBeMove + 1, 1);
            flightPlanCoordinates.splice(indexToBeShift, 0, flightPlanCoordinates[indexToBeMove]);
            flightPlanCoordinates.splice(indexToBeMove + 1, 1);
          }
        }
        setIsRender(prev => !prev);
        // let newList = structuredClone(filteredData);
        // console.log(new);
        // setFilteredData(newList);
      };
    }
  }

  setTimeout(() => {
    for (let i = 0; i < document.getElementsByClassName("stopNames-container").length; i++) {
      if (i !== 0) {
        document.getElementsByClassName("stopNames-container")[i].addEventListener("mouseover", () => {
          document.getElementsByClassName("cross")[i].classList.add("myClassName");
        })
        document.getElementsByClassName("stopNames-container")[i].addEventListener("mouseleave", () => {
          document.getElementsByClassName("cross")[i].classList.remove("myClassName");
        })
      }
    }
    for (let i = 0; i < document.getElementsByClassName("tempMyStudents").length; i++) {
      document.getElementsByClassName("tempMyStudents")[i].addEventListener("mouseover", () => {
        document.getElementsByClassName("studentCross")[i].classList.add("myStudentClass");
      })
      document.getElementsByClassName("tempMyStudents")[i].addEventListener("mouseleave", () => {
        document.getElementsByClassName("studentCross")[i].classList.remove("myStudentClass");
      })
    }
  })

  return (
    <div style={{ display: "flex" }}>
      <div className='stop-container'>
        <ul id='sortlist' className='stop-subcontainer'>
          {STOP_DETAILS.map((data, index) => {
            return (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className='stopNames-container'>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {index !== STOP_DETAILS.length - 1 &&
                      <img src={connectionPoint} className="connectedPoint" />
                    }
                    {index === STOP_DETAILS.length - 1 &&
                      <img src={endPoint} className="connectedPoint" style={{ width: "15px" }} />
                    }
                    <li id={index + 10} className="stopNames" draggable>
                      <p>{data.stopName}</p>
                    </li>
                  </div>
                  <p className='cross' onClick={crossClickHandler} >X</p>
                </div>
                <div className='student-info'>
                  {index !== STOP_DETAILS.length - 1 &&
                    <img src={threedots} className="threedots" />
                  }
                  {index === STOP_DETAILS.length - 1 &&
                    <img src="" className='threedots' style={{ visibility: "hidden" }} />
                  }
                  <div className='studenNames-contaner'>
                    {data?.riders?.map((name, index) =>
                      <div className="tempMyStudents" style={{ marginRight: "5px", borderRadius: "0px", marginTop: "5px", display: "inline-block" }}>
                        <p>{name}</p>
                        <span className='studentCross' onClick={subCrossClickHandler} >X</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </ul>
        <button id="asdf" style={{ visibility: "hidden" }} onClick={() => slist(document.getElementById("sortlist"))}>click</button>
      </div>
      <div className='stopInfo-container'>
        <div className='sub-header'>
          <p>Select stops for the route</p>
          {/* <span>Shuttle capacity: {shuttleSeatingCapacity}</span> */}
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
    </div>
  )
}

export default StopInfo;