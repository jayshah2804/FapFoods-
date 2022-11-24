import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../Loading/Loading";
import Accordian from "./Accordian";
import "./Records.css";

const Records = ({ isLoading, data, headers }) => {
    const [isStudentDisbaleClicked, setIsStudentDisableClicked] = useState(false);
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(myData => <tr>
                            <td>{myData.name}</td>
                            <td>{myData.mobile_no}</td>
                            <td>{myData.superviser_name}</td>
                            <td width="15%">{myData.department}</td>
                            <td>{myData.status}</td>
                            {/* <td width="20%" >{myData.department}</td> */}
                            <td width="10%"><Accordian myId={myData.id} forMyRender={func} setIsStudentDisableClicked={setIsStudentDisableClicked} /></td>
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
                    {isLoading ? <Loading datatable="true" /> :
                        <div style={{ textAlign: "center", marginTop: "10px" }}>No Data Available</div>
                    }
                </React.Fragment>
            }
            {isStudentDisbaleClicked &&
                <div className="alert_studentDisble">
                    <header>
                        <span>Alert</span><span style={{ cursor: "pointer" }} onClick={() => setIsStudentDisableClicked(false)} >X</span>
                    </header>
                    <hr />
                    <br />
                    <main>
                        <p>You going to disable the student</p>
                    </main>
                    <footer>
                        <span>Do you want to proceed?</span>
                        <div>
                            <button>Yes</button>
                            <button onClick={() => setIsStudentDisableClicked(false)}>No</button>
                        </div>
                    </footer>
                </div>
            }
        </React.Fragment>
    );
};

export default Records;
