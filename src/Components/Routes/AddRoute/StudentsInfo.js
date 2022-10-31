import React, { useState } from 'react'

const StudentsInfo = () => {
    const [students, setStudents] = useState([]);
    const studentSelectHandler = (e) => {
        setStudents(prev => [...prev, e.target.value]);
    }
  return (
    <React.Fragment>
        <label>Select Students to add into route: </label>
        <select onChange={studentSelectHandler}>
            <option>--select--</option>
            <option>Jay Shah</option>
            <option>Dev Shah</option>
            <option>Roshan Chauhan</option>
            <option>Het Desai</option>
            <option>Darshan Kansara</option>
        </select>
        <h3>Selected Students:</h3>
        {/* {console.log(students)} */}
        {students.map((data) => <span>{data}</span>)}
    </React.Fragment>
  )
}

export default StudentsInfo