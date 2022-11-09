import React, { useRef, useState } from 'react';
import TimingsInfo from './TimingsInfo';
import "./RouteInfo.css";

let prev = "";
let current = "RouteInfo";
let next = "";
let error = {
    routeName: "",
    routeType: ""
}
function RouteInfo(props) {
    const routeNameInputRef = useRef();
    const routeTypeSelectRef = useRef();
    const [isNextClicked, setIsNextClicked] = useState();
    const [isError, setIsError] = useState(error);

    const routeNameChangeHandler = () => {
        if (routeNameInputRef.current.value) {
            setIsError(prev => ({ ...prev, routeName: "" }));
        }
    }
    const routeTypeChangeHandler = () => {
        if (routeTypeSelectRef.current.value !== "Route Type")
            setIsError(prev => ({ ...prev, routeType: "" }));
    }

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
        if (routeNameInputRef.current.value && routeTypeSelectRef.current.value) {
            current = "RouteInfo";
            nextWizard("TimingInfo");
            setIsNextClicked(true);
        } else {
            if (!routeNameInputRef.current.value)
                setIsError(prev => ({ ...prev, routeName: "Route name is invalid" }));
            if (routeTypeSelectRef.current.value === "Route Type")
                setIsError(prev => ({ ...prev, routeType: "Route type is invalid" }));
        }
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
                    <div className='routeInfo-subContainer'>
                        <input type="text" id="route-name" ref={routeNameInputRef} placeholder='Route Name' onChange={routeNameChangeHandler} />
                        {isError.routeName && <p className='error-roureName' >{isError.routeName}</p>}
                        <select ref={routeTypeSelectRef} onChange={routeTypeChangeHandler} >
                            <option disabled selected>Route Type</option>
                            <option>Pick Students</option>
                            <option>Intra City</option>
                        </select>
                        {/* {isError.routeType && <p className='error-routeType'>{isError.routeType}</p>} */}
                    </div>
                    <button className='nextButton' onClick={nextClickHandler}>Next</button>
                </div>
            }
            {isNextClicked && <TimingsInfo nextWizard={nextWizard} backWizard={backWizard} setIsNextClicked={setIsNextClicked} backClickHandler={backClickHandler} setIsAddRouteClicked={props.setIsAddRouteClicked} />}
        </div>
    )
}

export default RouteInfo;