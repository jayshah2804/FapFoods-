import React, { useState } from 'react';
import TimingsInfo from './TimingsInfo';
import "./RouteInfo.css";

let prev = "";
let current = "RouteInfo";
let next = "";
function RouteInfo(props) {
    const [isNextClicked, setIsNextClicked] = useState();

    const nextWizard = (value) => {
        document.getElementById(current).classList.remove("in-progress");
        document.getElementById(current).classList.add("complete");
        if (value === "TimingInfo") {
            prev = "RouteInfo";
            current = value;
            next = "Departments";
        }
        if (value === "Departments") {
            prev = "TimingInfo";
            current = value;
            next = "StopInfo";
        }
        if (value === "StopInfo") {
            prev = "Departments";
            current = value;
            next = "";
        }
        if (value !== "Submit")
            document.getElementById(current).classList.add("in-progress");
    }

    const backWizard = (value) => {
        document.getElementById(current).classList.remove("in-progress");
        document.getElementById(prev).classList.remove("complete");
        document.getElementById(prev).classList.add("in-progress");
        if (value === "TimingInfo") {
            current = "RouteInfo";
            next = "TimingInfo";
        }
        if (value === "Departments") {
            current = "TimingInfo";
            next = "Departments";
            prev = "RouteInfo";
        }
        if (value === "StopInfo") {
            current = "Departments";
            next = "StopInfo";
            prev = "TimingInfo";
        }
    }

    const nextClickHandler = () => {
        current = "RouteInfo";
        nextWizard("TimingInfo");
        setIsNextClicked(true);
    }
    const backClickHandler = () => {
        backWizard("TimingInfo");
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
            {isNextClicked && <TimingsInfo nextWizard={nextWizard} backWizard={backWizard} setIsNextClicked={setIsNextClicked} backClickHandler={backClickHandler} setIsAddRouteClicked={props.setIsAddRouteClicked} />}
        </div>
    )
}

export default RouteInfo;