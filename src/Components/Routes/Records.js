import React, { useState } from "react";
import Accordian from "./Accordian";
import "./Records.css";

const Records = ({ data, headers }) => {
    const func = (val) => {
        if (val) {
            document.getElementById(val).click();
        }
    }
    return (
        <React.Fragment>
            <table className="table" id="my-table">
                <thead>
                    <tr>
                        {headers.map((data) => (
                            // <th scope="col">{data}</th>
                            <th>{data}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(myData => <tr>
                        <td>{myData.route_id}</td>
                        <td>{myData.route}</td>
                        <td>{myData.city}</td>
                        <td>{myData.country}</td>
                        <td>{myData.zone_price}</td>
                        <td>{myData.route_type}</td>
                        <td width="20%" >{myData.department}</td>
                        <td><Accordian myId={myData.id} forMyRender={func} /></td>
                    </tr>)}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default Records;
