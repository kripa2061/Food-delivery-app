import React, { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets"; // add a food delivery illustration
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const url = "http://localhost:5001";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/add");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/adminlogin`, { email, password });
      const data = response.data;
      if (!data.success) return alert(data.message);

      localStorage.setItem("adminToken", data.token);
      navigate("/add");
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <>
    <h3 className="title">Admin Login</h3>
 
    <div className="login-page">
      
  <div className="login-card">
    {/* Left side image */}
    <div className="login-left">
      <img src={assets.login} alt="Food Delivery" />
    </div>

    {/* Right side login form */}
    <div className="login-right">
      <div>
        <h2>Welcome Back!</h2>
        <p>Login to manage your orders</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
         
        </form>
      </div>
    </div>
  </div>
</div>
   </>
  );
};

export default Login;
