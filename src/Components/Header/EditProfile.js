import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import "./EditProfile.css";

let erros = {
  file: "",
  confirm: "",
  new: "",
  old: ""
}
const EditProfile = ({ adminPhoto, setIsEditProfileClicked, adminName, adminOrg }) => {
  const [isAdminPhotoChanged, setIsAdminPhotoChanged] = useState(adminPhoto);
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isError, setIsError] = useState(erros);

  const adminPhotoChangeHandler = (e) => {
    if (e.target.files[0].size > 500000) {
      setIsError(prev => ({ ...prev, file: "File size must be less than 5 mb" }));
    }
    else if (!(e.target.files[0].name.includes("jpg") || e.target.files[0].name.includes("jpeg") || e.target.files[0].name.includes("png"))) {
      setIsError(prev => ({ ...prev, file: "File size must be of jpg, png or jpeg" }));
    } else {
      setIsError(prev => ({ ...prev, file: "" }));
      getBase64(e.target.files[0]).then((data) => setIsAdminPhotoChanged(data));
    }
  }
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const adminInfoUpdateHandler = () => {
    if (newPasswordInputRef.current.value.length < 8) {

    }
  }
  return (
    <React.Fragment>
      <div className="edit-profile-container"></div>
      <div className="edit-profile">
        <header>
          <span>Edit Profile</span>
          <span onClick={() => {
            setIsEditProfileClicked(false);
            document.body.style.overflow = "auto";
          }
          }>X</span>
        </header>
        <main>
          <div className="admin-info">
            <div style={{ position: "relative" }}>
              <img src={isAdminPhotoChanged} alt="admin img" />
              <BsFillPencilFill title="Click to change profile photo" className="edit-icon" onClick={() => document.getElementById("admin_photo_change").click()} />
            </div>
            <input type="file" id="admin_photo_change" style={{ display: "none" }} onChange={adminPhotoChangeHandler} />
            <p>{adminName}</p>
            <p>{adminOrg}</p>
          </div>
          <h4>Change Passoword</h4>
          <div className="change-password">
            <input
              type="password"
              placeholder="Old Passowrd"
              ref={oldPasswordInputRef}
            />
            <input
              type="password"
              placeholder="New Passowrd"
              ref={newPasswordInputRef}
            />
            <input
              type="password"
              placeholder="Confirm Passowrd"
              ref={confirmPasswordInputRef}
            />
          </div>
          <footer>
            <button onClick={adminInfoUpdateHandler}>Save</button>
          </footer>
        </main>
      </div>
    </React.Fragment>
  );
};

export default EditProfile;