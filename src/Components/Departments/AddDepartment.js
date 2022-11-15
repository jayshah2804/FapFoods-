import React from 'react';
import "./AddDepartment.css";

const AddDepartment = () => {
    return (
        <div className='add-department-container'>
            <div>
                <h3>ADD NEW DEPARTMENT</h3>
            </div>
            <div className='add-department-subcontainer'>
                <div>
                    <main>
                        <header style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Allow Inter Country</span>
                            <div class="container">
                                <label class="switch" for="checkbox">
                                    <input type="checkbox" id="checkbox" className='first' />
                                    <div class="slider1 round"></div>
                                </label>
                            </div>
                        </header>
                        <div>This option enables one to take Corporate Trips in different countries</div>
                    </main>
                    <footer></footer>
                </div>
                <div>
                    <main>
                    <header style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Lock Vehicle Type</span>
                            <div class="container">
                                <label class="switch" for="checkbox">
                                    <input type="checkbox" id="checkbox" className='second' />
                                    <div class="slider2 round"></div>
                                </label>
                            </div>
                        </header>
                        <div>If set to 'YES' this will restrict all staff in this corporate from changing the approved vehicle type when requesting for a trip</div>
                    </main>
                    <footer></footer>
                </div>
                <div>
                    <main>
                        <header>
                            <span>Preferred Vehicle Categories</span>
                        </header>
                        <select>
                            <option disabled selected>Select</option>
                            <option>Basic</option>
                            <option>Comfort</option>
                            <option>Comfort plus</option>
                        </select>
                        <div>Select the vehicle categories you wish your company to use</div>
                    </main>
                    <footer></footer>
                </div>
                <div>
                    <main>
                        <header>
                            <span>Enabled Services</span>
                        </header>
                        <select>
                            <option>Select</option>
                            <option>Ride</option>
                            <option>Food</option>
                        </select>
                        <div>Select the Services you wish your company to use</div>
                    </main>
                    <footer></footer>
                </div>
            </div>
            <div className='create-department'>
                <header>Create Department</header>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
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