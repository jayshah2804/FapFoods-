import React, { useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import SelectDepartment from './SelectDepartment';

const TimingsInfo = (props) => {
    const [isRegisterForWeekend, setIsRegisterForWeekend] = useState();
    const [isNextClicked, setIsNextClicked] = useState();
    const weekendTimingRegisterHandler = () => {
        setIsRegisterForWeekend(true);
    }
    const nextClickHandler = () => {
        setIsNextClicked(true);
    }
    return (
        <React.Fragment>
            {!isNextClicked &&
                <React.Fragment>
                    <div>
                        <MdArrowBack onClick={() => props.setIsNextClicked()} />
                        Set Route Timings per day for the week
                    </div>
                    <span>Monday to Friday</span>
                    <input type="time" />
                    <br />
                    <p onClick={weekendTimingRegisterHandler} >Click to register for the timings for saturday and sunday</p>
                    {isRegisterForWeekend &&
                        <div>
                            <span>saturday</span>
                            <input type="time" />
                            <br />
                            <span>Sunday</span>
                            <input type="time" />
                        </div>
                    }
                    <button onClick={nextClickHandler}>Next</button>
                </React.Fragment>
            }
            {isNextClicked && <SelectDepartment setIsNextClicked={setIsNextClicked} />}
        </React.Fragment>
    )
}

export default TimingsInfo