import React from "react";
import { useRef } from "react";
import adminAlternative from "../../Assets/adminAlternative.png";

import "./EditProfile.css";

const EditProfile = ({ profilePhoto }) => {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  return (
    <div className="edit-profile">
      <header>
        <span>Edit Profile</span>
        <span>X</span>
      </header>
      <main>
        <div className="admin-info">
          <img src={adminAlternative} alt="admin img" />
          <p>Jay Shah</p>
          <p>Eximious Global</p>
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
          <button>Save</button>
        </footer>
      </main>
    </div>
  );
};

export default EditProfile;
