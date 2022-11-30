import React, { useEffect } from 'react';
import "./Message.css";

const Message = (props) => {
    useEffect(() => {
        if (props.type.toLowerCase() === "success")
            document.getElementById("header").style.backgroundColor = "rgba(42, 149, 69, 255)";
        else document.getElementById("header").style.backgroundColor = "rgb(226, 44, 29)";

    })
    return (
        <div className='modal-background'>
            <div className='modal-data'>
                <div>
                    <header id='header' >
                        <span>
                            {props.type}
                        </span>
                        <span className='cross' onClick={() => window.location.reload()} >X</span>
                    </header>
                    <hr />
                </div>
                <main>
                    <p>{props.type.toLowerCase() === "success" ? props.message : "Some Error Occured. Please Try Again Later"}</p>
                </main>
            </div>
        </div>
    )
}

export default Message