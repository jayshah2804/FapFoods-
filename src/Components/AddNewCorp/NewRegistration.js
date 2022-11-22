import React from 'react';
import { useRef } from 'react';
import "./NewRegistration.css";


const DATA_ERRORS = {
    countryError: "",
    industryError: "",
    corporateNameError: "",
    corporateDomainError: "",
    adminNameError: "",
    adminEmailError: "",
    adminContactError: "",
    invoiceContactNameError: "",
    invoiceContactEmailError: "",
    accountManagerError: "",
    salesExecutiveError: "",
    creditPeriodError: "",
    contractStartDateError: "",
    contractEndDateError: ""
}

const NewRegistration = () => {
    const countrySelectRef = useRef();
    const industrySelectRef = useRef();
    const corporateNameInputRef = useRef();
    const corporateDomainInputRef = useRef();
    const corporateLogoInputRef = useRef();
    const adminNameInputRef = useRef();
    const adminEmailInputRef = useRef();
    const adminMobileInputRef = useRef();
    const adminPhotoInputRef = useRef();
    const invoiceContactNameInputRef = useRef();
    const invoiceContactEmailInputRef = useRef();
    const accountManagerSelectRef = useRef();
    const salesExecutiveSelectRef = useRef();
    const CreditPeriodInputRef = useRef();
    const contractStartDateInputRef = useRef();
    const contractEndDateInputRef = useRef();

    const corporateLogoChangeHandler = (e) => {
        console.log(e.target.files[0]);
        // e.target.type = "text";
        // console.log(corporateLogoInputRef.current.value);
    }

    return (
        <div className='new-corp-conatiner' id='new-reg' >
            <header>New Corporate Registration</header>
            <div className='new-corp-subcontainer'>
                <div>
                    <select ref={countrySelectRef} >
                        <option selected disabled>Country</option>
                        <option>India</option>
                        <option>Kenya</option>
                        <option>Ghana</option>
                        <option>Slomalia</option>
                    </select>
                    <select ref={industrySelectRef} >
                        <option selected disabled>Industry</option>
                        <option>Hospital</option>
                        <option>Recruitment Agency</option>
                        <option>EdTech</option>
                        <option>FinTech</option>
                        <option>Logistics</option>
                        <option>Consultancy Firm</option>
                        <option>Transporation</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder='Corporate Name' ref={corporateNameInputRef} />
                    <input type="text" placeholder='Corporate Domain' ref={corporateDomainInputRef} />
                    <input type="file" placeholder='Corporate Logo' onChange={corporateLogoChangeHandler} ref={corporateLogoInputRef} />
                </div>
                <div>
                    <input type="text" placeholder='Admin Name' ref={adminNameInputRef} />
                    <input type="email" placeholder='Admin Email' ref={adminEmailInputRef} />
                    <input type="number" placeholder='Admin Contact Number' ref={adminMobileInputRef} />
                </div>
                <div>
                    <input type="file" placeholder='Admin Photo' ref={adminPhotoInputRef} />
                    <input type="text" placeholder='Invoice Contact Name' ref={invoiceContactNameInputRef} />
                    <input type="email" placeholder='Invoice Contact Email' ref={invoiceContactEmailInputRef} />
                </div>
                <div>
                    <select ref={accountManagerSelectRef} >
                        <option selected>Account Manager</option>
                    </select>
                    <select ref={salesExecutiveSelectRef} >
                        <option selected>Sales Executive</option>
                    </select>
                </div>
                <div>
                    <input type="number" placeholder='Credit Period' ref={CreditPeriodInputRef} />
                    <input type="text" placeholder='Contract Start Date' ref={contractStartDateInputRef} onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} />
                    <input type="text" placeholder='Contract End Date' ref={contractEndDateInputRef} onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} />
                </div>
                <div style={{ alignSelf: "flex-end" }}>
                    <button>Back</button>
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}

export default NewRegistration