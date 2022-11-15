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
                        <td><Accordian myId={myData.id} forMyRender={func} /></td>
                    </tr>)}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default Records;
