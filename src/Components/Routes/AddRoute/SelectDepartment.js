import React, { useState } from 'react';
import StudentsInfo from './StopInfo';

import "./SelectDepartment.css";


const DEPARTMENTS = ["Sales and Marketing", "Little school testing"];
const SelectDepartment = (props) => {
    const [isDepartmentChanged, setIsDepartmentChanged] = useState();
    const nextClickHandler = () => {
        setIsDepartmentChanged(prev => !prev);
        props.nextWizard("StopInfo");
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
                    {DEPARTMENTS && DEPARTMENTS.map(data => {
                        return (
                            <React.Fragment>
                                <input type="radio" name='department' value={data} /><span>{data}</span>
                            </React.Fragment>
                        );
                    })}
                    <div className='footer'>
                        <button onClick={backClickHandler}>Back</button>
                        <button onClick={nextClickHandler} >Next</button>
                    </div>
                </div>
            }
            {isDepartmentChanged && <StudentsInfo backWizard={props.backWizard} nextWizard={props.nextWizard} setIsDepartmentChanged={setIsDepartmentChanged} setIsAddRouteClicked={props.setIsAddRouteClicked}  />}
        </React.Fragment>
    )
}

export default SelectDepartment