import React, { useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import { useNavigate } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

  navigate("/sign")
  };
 

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <div className="admin-logo-text">
            <h1>ZestyBites</h1>
            <p>Admin Panel</p>
          </div>
        </div>

        <div className="navbar-right">
          <img
            className="profile-image"
            src={assets.profile_image}
            alt="Profile"
          />
          <button className="admin-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <hr className="navbar-divider" />
    </div>
  );
};

export default Navbar;
