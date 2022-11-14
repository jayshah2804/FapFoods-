import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import Accordian from "./_Accordian";
import "./Records.css";

const Records = ({ data, headers }) => {
    const history = useHistory();
    // const func = (val) => {
    //     if (val) {
    //         document.getElementById(val).click();
    //     }
    // }
    return (
        <React.Fragment>
            <table className="table" id="my-table">
                <thead>
                    <tr>
                        {headers.map((data) => (
                            <th>{data}</th>
                        ))}
                    </tr>
                </thead>
                {/* <tbody  onClick={(e) => console.log(e.target.parentElement.children[0])}> */}
                <tbody  onClick={() => history.push("/routes/stops")}>
                    {data.map(myData => <tr>
                        <td>{myData.route_id}</td>
                        <td>{myData.route}</td>
                        <td>{myData.city}</td>
                        <td>{myData.country}</td>
                        <td>{myData.zone_price}</td>
                        <td>{myData.route_type}</td>
                        <td width="20%" >{myData.department}</td>
                        {/* <td><Accordian myId={myData.id} forMyRender={func} /></td> */}
                    </tr>)}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default Records;
