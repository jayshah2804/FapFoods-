import React, { useRef, useState } from 'react';
import StudentsInfo from './StopInfo';

import "./SelectDepartment.css";

let selectedDepartment = "";
let error = "";
const DEPARTMENTS = ["Sales and Marketing", "Little school testing"];
const SelectDepartment = (props) => {
    const departmentInputRef = useRef();
    const [isDepartmentChanged, setIsDepartmentChanged] = useState();
    const [isError, setIsError] = useState(error);

    const departmentChangeHandler = (e) => {
        selectedDepartment = e.target.value;
        if (selectedDepartment)
            setIsError("");
    }
    const nextClickHandler = () => {
        if (selectedDepartment) {
            setIsDepartmentChanged(prev => !prev);
            props.nextWizard("StopInfo");
        } else setIsError("Department is invalid");
        // document.getElementsByClassName("add-route-container")[0].style.width = "max-content";
    }
    const backClickHandler = () => {
        props.backWizard("Departments");
        props.setIsNextClicked(false);
    }
    return (
        <React.Fragment>
            {!isDepartmentChanged &&
                <div className='department-container'>
                    <p>Select Department</p>
                    <div className='department-subcontainer'>
                        {DEPARTMENTS && DEPARTMENTS.map(data => {
                            return (
                                    <div style={{display: "inline-block"}}>
                                        <input type="radio" ref={departmentInputRef} name='department' onChange={departmentChangeHandler} value={data} /><span>{data}</span>
                                    </div>
                            );
                        })}
                        {isError && <p className='department-error'>{isError}</p>}
                    </div>
                    <div className='footer'>
                        <button onClick={backClickHandler}>Back</button>
                        <button onClick={nextClickHandler} >Next</button>
                    </div>
                </div>
            }
            {isDepartmentChanged && <StudentsInfo backWizard={props.backWizard} nextWizard={props.nextWizard} setIsDepartmentChanged={setIsDepartmentChanged} setIsAddRouteClicked={props.setIsAddRouteClicked} />}
        </React.Fragment>
    )
}

export default SelectDepartment