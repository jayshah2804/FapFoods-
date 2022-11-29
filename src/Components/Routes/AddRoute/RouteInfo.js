import React, { useRef, useState } from 'react';
import TimingsInfo from './TimingsInfo';
import "./RouteInfo.css";

let prev = "";
let current = "RouteInfo";
let next = "";
let error = {
    routeName: "",
    routeType: "",
    shuttleType: ""
}
function RouteInfo(props) {
    const routeNameInputRef = useRef();
    const routeTypeSelectRef = useRef();
    const shuttleTypeSelectRef = useRef();
    const [isNextClicked, setIsNextClicked] = useState();
    const [isError, setIsError] = useState(error);

    const routeNameChangeHandler = () => {
        if (routeNameInputRef.current.value) {
            sessionStorage.setItem("routeName", routeNameInputRef.current.value);
            setIsError(prev => ({ ...prev, routeName: "" }));
        }
    }
    const routeTypeChangeHandler = () => {
        if (routeTypeSelectRef.current.value !== "Route Type") {
            if (routeTypeSelectRef.current.value === "Pickup Busbuddy")
                sessionStorage.setItem("routeType", "1");
            else if (routeTypeSelectRef.current.value === "Corporate Commuters")
                sessionStorage.setItem("routeType", "2");
            else if (routeTypeSelectRef.current.value === "Private Drive")
                sessionStorage.setItem("routeType", "3");
            setIsError(prev => ({ ...prev, routeType: "" }));
        }
    }

    const shuttleTypeChangeHandler = () => {
        if (shuttleTypeSelectRef.current.value !== "Shuttle Type") {
            if (shuttleTypeSelectRef.current.value === "Basic")
                sessionStorage.setItem("shuttleType", "1");
            else if (shuttleTypeSelectRef.current.value === "Comfort")
                sessionStorage.setItem("shuttleType", "2");
            else if (shuttleTypeSelectRef.current.value === "Comfort plus")
                sessionStorage.setItem("shuttleType", "3");
            else if (shuttleTypeSelectRef.current.value === "Busbuddy")
                sessionStorage.setItem("shuttleType", "4");
            setIsError(prev => ({ ...prev, shuttleType: "" }));
        }
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
        // if (routeNameInputRef.current.value && routeTypeSelectRef.current.value !== "Route Type" && shuttleTypeSelectRef.current.value !== "Shuttle Type") {
            current = "RouteInfo";
            nextWizard("TimingInfo");
            setIsNextClicked(true);
        // } else {
        //     if (!routeNameInputRef.current.value)
        //         setIsError(prev => ({ ...prev, routeName: "Route name is invalid" }));
        //     if (routeTypeSelectRef.current.value === "Route Type")
        //         setIsError(prev => ({ ...prev, routeType: "Route type is invalid" }));
        //     if (shuttleTypeSelectRef.current.value === "Shuttle Type")
        //         setIsError(prev => ({ ...prev, shuttleType: "Shuttle type is invalid" }));
        // }
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
                        <div>
                            <input type="text" id="route-name" ref={routeNameInputRef} placeholder='Route Name' onChange={routeNameChangeHandler} />
                            {isError.routeName && <p className='error' >{isError.routeName}</p>}
                        </div>
                        <div >
                            <select ref={routeTypeSelectRef} onChange={routeTypeChangeHandler} >
                                <option disabled selected>Route Type</option>
                                <option>Pickup Busbuddy</option>
                                <option>Corporate Commuters</option>
                                <option>Private Drive</option>
                            </select>
                            {isError.routeType && <p className='error'>{isError.routeType}</p>}
                        </div>
                        <div>
                            <select ref={shuttleTypeSelectRef} onChange={shuttleTypeChangeHandler} >
                                <option disabled selected>Shuttle Type</option>
                                <option>Basic</option>
                                <option>Comfort</option>
                                <option>Comfort plus</option>
                                <option>Busbuddy</option>
                            </select>
                            {isError.shuttleType && <p className='error'>{isError.shuttleType}</p>}
                        </div>
                    </div>
                    <button className='nextButton' onClick={nextClickHandler}>Next</button>
                </div>
            }
            {isNextClicked && <TimingsInfo nextWizard={nextWizard} backWizard={backWizard} setIsNextClicked={setIsNextClicked} backClickHandler={backClickHandler} setIsAddRouteClicked={props.setIsAddRouteClicked} />}
        </div>
    )
}

export default RouteInfo;