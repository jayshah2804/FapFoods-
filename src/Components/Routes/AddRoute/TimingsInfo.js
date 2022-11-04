import React, { useRef, useState } from 'react';
import SelectDepartment from './SelectDepartment';

import "./TimingsInfo.css";

const TIMINGS =
{
    monday: {
        pickup: "",
        drop: ""
    },
    tuesday: {
        pickup: "",
        drop: ""
    },
    wednesday: {
        pickup: "",
        drop: ""
    },
    thursday: {
        pickup: "",
        drop: ""
    },
    friday: {
        pickup: "",
        drop: ""
    },
    saturday: {
        pickup: "",
        drop: ""
    },
    sunday: {
        pickup: "",
        drop: ""
    },
}

let dayName = "";
const TimingsInfo = (props) => {
    const pickupTimeInputRef = useRef();
    const dropTimeInputRef = useRef();
    const [isDayTimeChange, setIsDayTimeChange] = useState({ dayname: "" });
    const [isTimingChange, setIsTimingChange] = useState();
    const [isNextClicked, setIsNextClicked] = useState();
    const nextClickHandler = () => {
        props.nextWizard("Departments");
        setIsNextClicked(true);
    }
    const backClickHandler = () => {
        props.backClickHandler("TimingInfo");
        props.setIsNextClicked(false);
    }
    const pickupTimeChangeHandler = () => {
        if (isDayTimeChange.dayname) {
            dayTimeChangeHandler(dayName);
        } else {
            TIMINGS.monday.pickup = pickupTimeInputRef.current.value;
            TIMINGS.tuesday.pickup = pickupTimeInputRef.current.value;
            TIMINGS.wednesday.pickup = pickupTimeInputRef.current.value;
            TIMINGS.thursday.pickup = pickupTimeInputRef.current.value;
            TIMINGS.friday.pickup = pickupTimeInputRef.current.value;
            TIMINGS.saturday.pickup = pickupTimeInputRef.current.value;
            TIMINGS.sunday.pickup = pickupTimeInputRef.current.value;
        }
        setIsTimingChange(prev => !prev);
    }
    const dropTimeChangeHandler = () => {
        if (isDayTimeChange.dayname) {
            dayTimeChangeHandler(dayName);
        } else {
            TIMINGS.monday.drop = dropTimeInputRef.current.value;
            TIMINGS.tuesday.drop = dropTimeInputRef.current.value;
            TIMINGS.wednesday.drop = dropTimeInputRef.current.value;
            TIMINGS.thursday.drop = dropTimeInputRef.current.value;
            TIMINGS.friday.drop = dropTimeInputRef.current.value;
            TIMINGS.saturday.drop = dropTimeInputRef.current.value;
            TIMINGS.sunday.drop = dropTimeInputRef.current.value;
        }
        setIsTimingChange(prev => !prev);
    }

    const dayTimeChangeHandler = (dayName) => {
        TIMINGS[dayName.toLowerCase()].pickup = pickupTimeInputRef.current.value;
        TIMINGS[dayName.toLowerCase()].drop = dropTimeInputRef.current.value;
    }

    const dayButtonClickHandler = (e) => {
        dayName = e.target.innerText;
        setIsDayTimeChange(prev => ({ ...prev, dayname: dayName }));
    }
    const disableDayClickHandler = () => {
        TIMINGS[dayName.toLowerCase()].pickup = "";
        TIMINGS[dayName.toLowerCase()].drop = "";
        setIsTimingChange(prev => !prev);
    }
    return (
        <React.Fragment>
            {!isNextClicked &&
                <div className='timingsInfo-container' >
                    {isDayTimeChange.dayname &&
                        <div className='dayTimeChange-container'>
                            <p>Change the time for the {dayName} </p>
                            <p>Or to disable the {dayName} <span onClick={disableDayClickHandler} >click here</span></p>
                        </div>
                    }
                    <input type="time" ref={pickupTimeInputRef} onChange={pickupTimeChangeHandler} className="pickuptime-input" />
                    <input type="time" ref={dropTimeInputRef} onChange={dropTimeChangeHandler} className="droptime-input" />
                    <br />
                    <div className='dayList-container' onClick={dayButtonClickHandler} >
                        <div>
                            <button>Monday</button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {TIMINGS.monday.pickup && <span>Pickup: {TIMINGS.monday.pickup}</span>}
                                {TIMINGS.monday.drop && <span>Drop: {TIMINGS.monday.drop}</span>}
                            </div>
                        </div>
                        <div>
                            <button>Tuesday</button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {TIMINGS.tuesday.pickup && <span>Pickup: {TIMINGS.tuesday.pickup}</span>}
                                {TIMINGS.tuesday.drop && <span>Drop: {TIMINGS.tuesday.drop}</span>}
                            </div>
                        </div>
                        <div>
                            <button>Wednesday</button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {TIMINGS.wednesday.pickup && <span>Pickup: {TIMINGS.wednesday.pickup}</span>}
                                {TIMINGS.wednesday.drop && <span>Drop: {TIMINGS.wednesday.drop}</span>}
                            </div>
                        </div>
                        <div>
                            <button>Thursday</button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {TIMINGS.thursday.pickup && <span>Pickup: {TIMINGS.thursday.pickup}</span>}
                                {TIMINGS.thursday.drop && <span>Drop: {TIMINGS.thursday.drop}</span>}
                            </div>
                        </div>
                        <div>
                            <button>Friday</button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {TIMINGS.friday.pickup && <span>Pickup: {TIMINGS.friday.pickup}</span>}
                                {TIMINGS.friday.drop && <span>Drop: {TIMINGS.friday.drop}</span>}
                            </div>
                        </div>
                        <div>
                            <button>Saturday</button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {TIMINGS.saturday.pickup && <span>Pickup: {TIMINGS.saturday.pickup}</span>}
                                {TIMINGS.saturday.drop && <span>Drop: {TIMINGS.saturday.drop}</span>}
                            </div>
                        </div>
                        <div>
                            <button>Sunday</button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {TIMINGS.sunday.pickup && <span>Pickup: {TIMINGS.sunday.pickup}</span>}
                                {TIMINGS.sunday.drop && <span>Drop: {TIMINGS.sunday.drop}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <button onClick={backClickHandler} >Back</button>
                        <button onClick={nextClickHandler}>Next</button>
                    </div>
                </div>
            }
            {isNextClicked && <SelectDepartment backWizard={props.backWizard} nextWizard={props.nextWizard} setIsNextClicked={setIsNextClicked} setIsAddRouteClicked={props.setIsAddRouteClicked} />}
        </React.Fragment >
    )
}

export default TimingsInfo