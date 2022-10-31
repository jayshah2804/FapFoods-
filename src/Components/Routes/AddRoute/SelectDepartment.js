import React, { useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import StudentsInfo from './StudentsInfo';


const DEPARTMENTS = ["Sales and Marketing", "Little school testing"];
const SelectDepartment = (props) => {
    const [isDepartmentChanged, setIsDepartmentChanged] = useState();
    const departmentChangeHandler = () => {
        setIsDepartmentChanged(true);
    }
    return (
        <React.Fragment>
            <div>
                <MdArrowBack onClick={() => props.setIsNextClicked()} />
                Select Department
            </div>
            {DEPARTMENTS && DEPARTMENTS.map(data => {
                return (
                    <div>
                        <input type="radio" name='department' value={data} onChange={departmentChangeHandler} /> {data}
                    </div>
                );
            })}
            {isDepartmentChanged && <StudentsInfo />}
        </React.Fragment>
    )
}

export default SelectDepartment