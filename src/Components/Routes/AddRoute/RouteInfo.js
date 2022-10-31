import React, { useState } from 'react'
import TimingsInfo from './TimingsInfo';

function RouteInfo(props) {
    const [isNextClicked, setIsNextClicked] = useState();
    const nextClickHandler = () => {
        setIsNextClicked(true);
    }
    return (
        <div className="add-route-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px" }}>
                <div>Shuttle Route Creation</div>
                <div onClick={() => props.setIsAddRouteClicked(false)}>X</div>
            </div>
            <hr />
            <br />
            {!isNextClicked &&
                <React.Fragment>
                    <label htmlFor='route-name'>Route Name:</label>
                    <input type="text" id="route-name" />
                    <label htmlFor='route-type'>Route Type:</label>
                    <select>
                        <option selected>--select--</option>
                        <option>Pick Students</option>
                        <option>Drop Students</option>
                    </select>
                    <button onClick={nextClickHandler}>Next</button>
                </React.Fragment>
            }
            {isNextClicked && <TimingsInfo setIsNextClicked={setIsNextClicked} />}
        </div>
    )
}

export default RouteInfo;