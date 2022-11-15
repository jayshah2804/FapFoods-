import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./Accordian.css";

let parent_prev_id;
let prev_active_status;
const Accordian = (props) => {
    const [isClicked, setIsClicked] = useState();
    const history = useHistory();

    const actionsClickHandler = (e) => {
        if (parent_prev_id !== e.target.id && !prev_active_status)
            props.forMyRender(parent_prev_id);
        parent_prev_id = e.target.id;
        prev_active_status = isClicked;

        setIsClicked(prev => !prev);
    }
    return (
        <div style={{ position: "relative" }}><button id={props.myId} className="actions" onClick={actionsClickHandler} >Actions</button>
            {isClicked && <div className='department_actions'>
                <p>Trips</p>
                <p>Statement</p>
                <p>Staff</p>
                <p>Admins</p>
            </div>
            }
        </div>
    )
}

export default Accordian;