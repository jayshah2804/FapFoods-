import React, { useState } from 'react';
import "./Accordian.css";

let parent_prev_id;
let prev_active_status;
const Accordian = (props) => {
    const [isClicked, setIsClicked] = useState();
    const actionsClickHandler = (e) => {
        if (parent_prev_id !== e.target.id && !prev_active_status)
            props.forMyRender(parent_prev_id);
        parent_prev_id = e.target.id;
        prev_active_status = isClicked;

        setIsClicked(prev => !prev);
    }
    return (
        <div style={{ position: "relative" }}><button id={props.myId} className="actions" onClick={actionsClickHandler} >Actions</button>
            {isClicked && <div className='routes_actions'>
                <p className='routes_actions_stops'>Stops</p>
                <p className='routes_actions_timings'>Timings</p>
            </div>
            }
        </div>
    )
}

export default Accordian;