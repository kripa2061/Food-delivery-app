import React, { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
 
  const url = "http://localhost:5001";
  const navigate = useNavigate();
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
  // Redirect if already logged in
 useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/add");
    }
  }, [navigate]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/adminlogin`, {
        email,
        password,
      });


      const data = response.data;
      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/add");
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="login-container">
      <img src={assets.admin} alt="Admin Icon" />

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
