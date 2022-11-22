import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../../Hooks/use-http';
import "./AddDepartment.css";

var showVehicle = true;
var showRide = true;
let allow_inter_country = "No";
let lock_vehicle_type = "No";
let preferredVehicles = ["Null"];
let enableSerices = ["Null"];
const formError = {
    vehicleCategoryError: "",
    enabledServicesError: "",
    departmentNameError: "",
    adminNameError: "",
    adminEmailError: ""
}

let isFormValid = false;
let addDeptFlag = 0;
const AddDepartment = () => {
    const [selectionChange, setSelectionChange] = useState();
    const [isFormError, setIsFormError] = useState(formError);
    const [isCall, setIsCall] = useState(false);
    const departmentNameInputRef = useRef();
    const adminNameInputRef = useRef();
    const adminEmailInputRef = useRef();
    const history = useHistory();


    const authenticateUser = (data) => {
        if (data.Message === "Success") {
            history.push("/departments");
            window.location.reload();
        }
        else
            alert(data.SystemMessage)
        // console.log(data);
    };

    const { sendRequest } = useHttp();

    useEffect(() => {
        // alert("here");
        if (addDeptFlag > 1)
            sendRequest({
                url: "/api/v1/Department/AddEditDepartment",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    emailID: sessionStorage.getItem("user"),
                    adminEmail: adminEmailInputRef.current.value,
                    adminName: adminNameInputRef.current.value,
                    buttonMark: "I",
                    departmentID: "",
                    departmentname: departmentNameInputRef.current.value,
                    parentID: sessionStorage.getItem("corpId"),
                    interCountryTrips: allow_inter_country === "Yes" ? "Y" : "N",
                    lockVehicleType: lock_vehicle_type === "Yes" ? "Y" : "N",
                    allowedVehicleType: preferredVehicles.toString(),
                    availableServices: enableSerices.toString()
                }
            }, authenticateUser);
        addDeptFlag++;
    }, [sendRequest, isCall])

    function showVehicleCheckboxes() {
        var checkboxes = document.getElementsByClassName("multipleSelection")[0].children[1];

        if (showVehicle) {
            checkboxes.style.display = "block";
            showVehicle = false;
        } else {
            let length = document.getElementsByClassName("multipleSelection")[0].children[1].children.length;
            preferredVehicles = [];
            for (let i = 0; i < length; i++) {
                if (document.getElementsByClassName("multipleSelection")[0].children[1].children[i]?.checked)
                    preferredVehicles.push(document.getElementsByClassName("multipleSelection")[0].children[1].children[i].value)
            }
            if (preferredVehicles.toString())
                document.getElementsByTagName("select")[0].children[0].innerText = preferredVehicles.toString();
            else {
                document.getElementsByTagName("select")[0].children[0].innerText = "Select";
                preferredVehicles = ["Null"];
            }
            checkboxes.style.display = "none";
            showVehicle = true;
            setSelectionChange(prev => !prev);
        }
    }
    function showRideCheckboxes() {
        var checkboxes = document.getElementsByClassName("multipleSelection")[1].children[1];

        if (showRide) {
            checkboxes.style.display = "block";
            showRide = false;
        } else {
            let length = document.getElementsByClassName("multipleSelection")[1].children[1].children.length;
            enableSerices = [];
            for (let i = 0; i < length; i++) {
                if (document.getElementsByClassName("multipleSelection")[1].children[1].children[i]?.checked)
                    enableSerices.push(document.getElementsByClassName("multipleSelection")[1].children[1].children[i].value)
            }
            if (enableSerices.toString())
                document.getElementsByTagName("select")[1].children[0].innerText = enableSerices.toString();
            else {
                document.getElementsByTagName("select")[1].children[0].innerText = "Select";
                enableSerices = ["Null"];
            }
            checkboxes.style.display = "none";
            showRide = true;
            setSelectionChange(prev => !prev);
        }
    }

    const interCountryChangeHandler = (e) => {
        e.target.checked ? allow_inter_country = "Yes" : allow_inter_country = "No";
        setSelectionChange(prev => !prev);
        // console.log(allow_inter_country);
    }
    const lockVehicleTypeChangeHandler = (e) => {
        e.target.checked ? lock_vehicle_type = "Yes" : lock_vehicle_type = "No";
        setSelectionChange(prev => !prev);
    }

    const createDepartmentClickedHandler = () => {
        setIsCall(prev => !prev);
        // if (preferredVehicles.toString() === "Null") {
        //     setIsFormError(prev => ({ ...prev, vehicleCategoryError: "vehicle category is invalid" }));
        // }
        // if (enableSerices.toString() === "Null") {
        //     setIsFormError(prev => ({ ...prev, enabledServicesError: "enabled service is invalid" }));
        // }
        // let obj = {
        //     allow_inter_country: allow_inter_country,
        //     lock_vehicle_type: lock_vehicle_type,
        //     preferredVehicles: preferredVehicles.toString(),
        //     enableSerices: enableSerices.toString(),
        //     department_name: departmentNameInputRef.current.value,
        //     admin_name: adminNameInputRef.current.value,
        //     admin_email: adminEmailInputRef.current.value
        // }
        // console.log(obj);
    }

    return (
        <div className='add-department-container' id='add-department'>
            <div>
                <h3>ADD NEW DEPARTMENT</h3>
            </div>
            <div className='add-department-subcontainer'>
                <div>
                    <main>
                        <header style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Allow Inter Country</span>
                            <label class="switch" for="checkbox">
                                <input type="checkbox" id="checkbox" className='first' onChange={interCountryChangeHandler} />
                                <div class="slider round"></div>
                            </label>
                        </header>
                        <div className='text'>This option enables one to take Corporate Trips in different countries</div>
                    </main>
                    <footer></footer>
                </div>
                <div>
                    <main>
                        <header style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Lock Vehicle Type</span>
                            <label class="switch" for="checkbox2">
                                <input type="checkbox" id="checkbox2" className='first' onChange={lockVehicleTypeChangeHandler} />
                                <div class="slider round"></div>
                            </label>
                        </header>
                        <div className='text'>If set to 'YES' this will restrict all staff in this corporate from changing the approved vehicle type when requesting for a trip</div>
                    </main>
                    <footer></footer>
                </div>
                <div>
                    <main>
                        <header>
                            <span>Preferred Vehicle Categories</span>
                        </header>
                        <div class="multipleSelection">
                            <div class="selectBox" onClick={showVehicleCheckboxes}>
                                <select>
                                    <option>Select</option>
                                </select>
                                <div class="overSelect"></div>
                            </div>

                            <div id="checkBoxes">
                                <input type="checkbox" value="Basic" id="first" /><label htmlFor='first' >Basic</label>
                                <br />
                                <input type="checkbox" value="Comfort" id="second" /><label htmlFor='second'>Comfort</label>
                                <br />
                                <input type="checkbox" value="Comfort Plus" id="third" /><label htmlFor='third'>Comfort Plus</label>
                                <br />
                            </div>
                        </div>
                        <div className='text'>Select the vehicle categories you wish your company to use</div>
                    </main>
                    <footer></footer>
                </div>
                <div>
                    <main>
                        <header>
                            <span>Enabled Services</span>
                        </header>
                        <div class="multipleSelection">
                            <div class="selectBox" onClick={showRideCheckboxes}>
                                <select>
                                    <option>Select</option>
                                </select>
                                <div class="overSelect"></div>
                            </div>

                            <div id="checkBoxes">
                                <input type="checkbox" value="Ride" id="first1" /><label htmlFor='first1'>Ride</label>
                                <br />
                                <input type="checkbox" value="Food" id="second1" /><label htmlFor='second1'>Food</label>
                                <br />
                            </div>
                        </div>
                        <div className='text'>Select the Services you wish your company to use</div>
                    </main>
                    <footer></footer>
                </div>
            </div>
            <div className='create-department'>
                <header>Create Department</header>
                <br />
                <div className='sub-container'>
                    <div>
                        <span>Allow Inter Country: </span><span>{allow_inter_country}</span>
                    </div>
                    <div>
                        <span>Lock Vehicle Type: </span><span>{lock_vehicle_type}</span>
                    </div>
                    <div>
                        <span>Preferred Vehicle Categories: </span><span>{preferredVehicles.toString()}</span>
                    </div>
                    <div>
                        <span>Enabled Services: </span><span>{enableSerices.toString()}</span>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", margin: "0px 40px", gap: "100px" }}>
                    <input type="text" placeholder='Department Name' ref={departmentNameInputRef} />
                    <input type="text" placeholder='Admin Name' ref={adminNameInputRef} />
                    <input type="email" placeholder='Admin Email' ref={adminEmailInputRef} />
                </div>
                <br />
                <button onClick={createDepartmentClickedHandler} >Create Department</button>
            </div>
        </div>
    )
}

export default AddDepartment