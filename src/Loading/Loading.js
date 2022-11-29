import React from 'react';
import "./Loading.css";

const Loading = (props) => {
    return (
        <React.Fragment>
            {
                props.datatable ?
                <div style={{width: "100%", textAlign: "center", zIndex: "100"}} className='loading'></div> :
                    <pre className='loading'></pre> 
            }
        </React.Fragment>
    )
}

export default Loading