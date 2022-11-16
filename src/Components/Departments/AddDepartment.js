import React from 'react';
import "./AddDepartment.css";

var showVehicle = true;
var showRide = true;
let allow_inter_country = false;
let lock_vehicle_type = false;
const AddDepartment = () => {
    function showVehicleCheckboxes() {
        var checkboxes = document.getElementsByClassName("multipleSelection")[0].children[1];

        if (showVehicle) {
            checkboxes.style.display = "block";
            showVehicle = false;
        } else {
            let length = document.getElementsByClassName("multipleSelection")[0].children[1].children.length;
            let arr = [];
            for (let i = 0; i < length; i++) {
                if (document.getElementsByClassName("multipleSelection")[0].children[1].children[i]?.checked)
                    arr.push(document.getElementsByClassName("multipleSelection")[0].children[1].children[i].value)
            }
            if (arr.toString())
                document.getElementsByTagName("select")[0].children[0].innerText = arr.toString();
            else
                document.getElementsByTagName("select")[0].children[0].innerText = "Select";
            checkboxes.style.display = "none";
            showVehicle = true;
        }
    }
    function showRideCheckboxes() {
        var checkboxes = document.getElementsByClassName("multipleSelection")[1].children[1];

        if (showRide) {
            checkboxes.style.display = "block";
            showRide = false;
        } else {
            let length = document.getElementsByClassName("multipleSelection")[1].children[1].children.length;
            let arr = [];
            for (let i = 0; i < length; i++) {
                if (document.getElementsByClassName("multipleSelection")[1].children[1].children[i]?.checked)
                    arr.push(document.getElementsByClassName("multipleSelection")[1].children[1].children[i].value)
            }
            if (arr.toString())
                document.getElementsByTagName("select")[1].children[0].innerText = arr.toString();
            else
                document.getElementsByTagName("select")[1].children[0].innerText = "Select";
            checkboxes.style.display = "none";
            showRide = true;
        }
    }

    const interCountryChangeHandler = (e) => {
        e.target.checked ? (allow_inter_country = "true") : (allow_inter_country = "false");
        // console.log(allow_inter_country);
    }
    const lockVehicleTypeChangeHandler = (e) => {
        e.target.checked ? (lock_vehicle_type = "true") : (lock_vehicle_type = "false");
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
                            {/* <label class="switch2" for="checkbox">
                                    <input type="checkbox" id="checkbox" className='second' />
                                    <div class="slider2 round"></div>
                                </label> */}
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
                                <input type="checkbox" value="Basic" id="first" /><span>Basic</span>
                                <br />
                                <input type="checkbox" value="Comfort" id="second" /><span>Comfort</span>
                                <br />
                                <input type="checkbox" value="Comfort Plus" id="third" /><span>Comfort Plus</span>
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
                                <input type="checkbox" value="Ride" id="first" /><span>Ride</span>
                                <br />
                                <input type="checkbox" value="Food" id="second" /><span>Food</span>
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
                <div style={{ display: "flex", alignItems: "center", margin: "0px 40px", gap: "100px" }}>
                    <input type="text" placeholder='Department Name' />
                    <input type="text" placeholder='Admin Name' />
                    <input type="email" placeholder='Admin Email' />
                </div>
                <br />
                <button>Create Department</button>
            </div>
        </div>
    )
}

export default AddDepartment