import React, { useState } from 'react';
import TimingsInfo from './TimingsInfo';
import "./RouteInfo.css";

let prev = "";
let current = "RouteInfo";
let next = "";
function RouteInfo(props) {
    const [isNextClicked, setIsNextClicked] = useState();
    const nextClickHandler = () => {
        document.getElementById(current).classList.remove("in-progress");
        document.getElementById(current).classList.add("complete");
        if(current === "RouteInfo") {
            prev = current;
            next = "TimingInfo";
            current = next;
        }
        document.getElementById(next).classList.add("in-progress");
        setIsNextClicked(true);
    }
    return (
        <div className="add-route-container">
            <div className='header'>
                <div>Shuttle Route Creation</div>
                <div className='closeIcon' onClick={() => props.setIsAddRouteClicked(false)}>X</div>
            </div>
            <hr />
            <br />
            <div className="wizard-progress">
                <div className="step in-progress" id="RouteInfo">
                    Route Info
                    <div className="node"></div>
                </div>
                <div className="step" id="TimingInfo">
                    Timing Info
                    <div className="node"></div>
                </div>
                <div className="step" id="Departments">
                    Departments
                    <div className="node"></div>
                </div>
                <div className="step" id="StopInfo">
                    Stop Info
                    <div className="node"></div>
                </div>
            </div>
            {!isNextClicked &&
                <div className='routeInfo-container'>
                    <div>
                    <input type="text" id="route-name" placeholder='Route Name' />
                    <select>
                        <option disabled selected>Route Type</option>
                        <option>Pick Students</option>
                        <option>Drop Students</option>
                    </select>
                    </div>
                    <button className='nextButton' onClick={nextClickHandler}>Next</button>
                </div>
            }
            {isNextClicked && <TimingsInfo setIsNextClicked={setIsNextClicked} />}
        </div>
    )
}

export default RouteInfo;