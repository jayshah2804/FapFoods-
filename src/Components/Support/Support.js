import React, { useRef, useState } from 'react';
import Email_img from "../../Assets/support_img.png";
import classes from "./Support.module.css";

const error = {
    firstNameError: "",
    lastNameError: "",
    subjectError: "",
    messageError: ""
}

let valid = true;
const Support = () => {
    const script = document.createElement("script");
    script.src = "https://smtpjs.com/v3/smtp.js";
    script.async = true;
    document.body.appendChild(script);

    const [isError, setIsError] = useState(error);
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const subjectInputRef = useRef();
    const messageInputRef = useRef();

    const firstNameChangeHandler = () => {
        if (firstNameInputRef.current.value) {
            valid = true;
            setIsError(prev => ({ ...prev, firstNameError: "" }));
        }
    }
    const lastNameChangeHandler = () => {
        if (lastNameInputRef.current.value) {
            valid = true;
            setIsError(prev => ({ ...prev, lastNameError: "" }));
        }
    }
    const subjectChangeHandler = () => {
        if (subjectInputRef.current.value) {
            valid = true;
            setIsError(prev => ({ ...prev, subjectError: "" }));
        }
    }
    const messageChangeHandler = () => {
        if (messageInputRef.current.value) {
            valid = true;
            setIsError(prev => ({ ...prev, messageError: "" }));
        }
    }

    const querySubmitHandler = (e) => {
        e.preventDefault()
        if (!(/^[a-zA-Z ]{1,15}$/.test(firstNameInputRef.current.value))) {
            valid = false;
            setIsError(prev => ({ ...prev, firstNameError: "Please Enter Valid First name" }));
        }
        if (!(/^[a-zA-Z ]{1,15}$/.test(lastNameInputRef.current.value))) {
            valid = false;
            setIsError(prev => ({ ...prev, lastNameError: "Please Enter Valid Last name" }));
        }
        if (!(/^[a-zA-Z ]{1,40}$/.test(subjectInputRef.current.value))) {
            valid = false;
            setIsError(prev => ({ ...prev, subjectError: "Please Enter Valid Subject" }));
        }
        if (!(/^[a-zA-Z ]{1,300}$/.test(messageInputRef.current.value))) {
            valid = false;
            setIsError(prev => ({ ...prev, messageError: "Please Enter Valid First name" }));
        }
        if (valid) {
            setIsError(error);
            // window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com&su=${subjectInputRef.current.value}&body=Hello I am ${firstNameInputRef.current.value} ${lastNameInputRef.current.value} from xxx Organization.${messageInputRef.current.value}`;
        }
    }
    return (
        <div className={classes.support} id="support">
            <div className={classes.mainHeader}>SUPPORT EMAIL</div>
            <div className={classes.supportContainer} id="support-container" >
                <img src={Email_img} alt='' id="support-img" className={classes.emailImage} />
                <form >
                    <header>Contact us</header>
                    <p>Have any questions? We'd love to hear from you</p>
                    <input type="text" placeholder='First Name' ref={firstNameInputRef} onChange={firstNameChangeHandler} />
                    {isError.firstNameError && <span className={classes.error}>{isError.firstNameError}</span>}
                    <input type="text" placeholder='Last Name' ref={lastNameInputRef} onChange={lastNameChangeHandler} />
                    {isError.lastNameError && <span className={classes.error}>{isError.lastNameError}</span>}
                    <input type="text" placeholder='Subject' ref={subjectInputRef} onChange={subjectChangeHandler} />
                    {isError.subjectError && <span className={classes.error}>{isError.subjectError}</span>}
                    <textarea placeholder='Message' ref={messageInputRef} onChange={messageChangeHandler} />
                    {isError.messageError && <span className={classes.error}>{isError.messageError}</span>}
                    <button type="submit" onClick={querySubmitHandler}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Support