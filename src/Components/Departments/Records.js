import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Accordian from "./Accordian";
// import "./Records.css";

const Records = ({ data, headers }) => {
    const history = useHistory();
    const func = (val) => {
        if (val) {
            document.getElementById(val).click();
        }
    }
    return (
        <React.Fragment>
            {data[0] ?
                <table className="table" id="my-table">
                    <thead>
                        <tr>
                            {headers.map((data) => (
                                <th>{data}</th>
                            ))}
                        </tr>
                    </thead>
                    {/* <tbody  onClick={(e) => console.log(e.target.parentElement.children[0])}> */}
                    <tbody>
                        {data.map(myData => <tr>
                            <td>{myData.department_name}</td>
                            <td>{myData.admin_name}</td>
                            <td>{myData.admin_email}</td>
                            <td>{myData.vehicle_category}</td>
                            <td><Accordian myId={myData.id} forMyRender={func} /></td>
                        </tr>)}
                    </tbody>
                </table>
                :
                <React.Fragment>
                    <table className="table" id="my-table">
                        <thead>
                            <tr>
                                {headers.map((data) => (
                                    <th>{data}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                    </table>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>No Data Available</div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default Records;

//git push origin HEAD:refs/heads/<origin>