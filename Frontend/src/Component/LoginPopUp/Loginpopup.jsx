import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Loginpopup.css";
import { storeContext } from "../../Context/Context";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
const LoginPopup = ({ showLogin, setShowLogin }) => {
  const { url, setToken } = useContext(storeContext);


  const [currentState, setCurrentState] = useState("signup");
  const [step, setStep] = useState("form");
const[showPassword,setShowPassword]=useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  useEffect(() => {
    setStep("form");
    setOtp("");
  }, [currentState, showLogin]);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        currentState === "login"
          ? "/api/user/login"
          : "/api/user/register";

      const response = await axios.post(url + endpoint, formData);

      if (!response.data.success) {
        alert(response.data.message);
        return;
      }

      if (currentState === "login") {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      }

      if (currentState === "signup") {
        setStep("otp");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      console.log("EMAIL:", formData.email);
      console.log("OTP:", otp);

      const response = await axios.post(url + "/api/user/verify-otp", {
        email: formData.email,
        otp,
      });

      if (!response.data.success) {
        alert(response.data.message);
        return;
      }

      
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);

    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  if (!showLogin) return null;

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <img
          src={assets.cross_icon}
          alt="close"
          className="close-icon"
          onClick={() => setShowLogin(false)}
        />

        {step === "form" && (
          <>
            <h2>{currentState === "signup" ? "Create Account" : "Login"}</h2>

            <form onSubmit={onSubmitForm}>
              {currentState === "signup" && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={onChangeHandler}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={onChangeHandler}
                required
              />

              <input
                type={showPassword?"text":"password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={onChangeHandler}
                required
              />
              <span
  className="toggle-password"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</span>

              <button type="submit">
                {currentState === "signup" ? "Sign Up" : "Login"}
              </button>
            </form>

            <p>
              {currentState === "signup"
                ? "Already have an account?"
                : "Don’t have an account?"}{" "}
              <span
                onClick={() =>
                  setCurrentState(
                    currentState === "signup" ? "login" : "signup"
                  )
                }
              >
                {currentState === "signup" ? "Login" : "Sign Up"}
              </span>
            </p>
          </>
        )}

        {step === "otp" && (
          <>
            <h2>Verify OTP</h2>
            <form onSubmit={onVerifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit">Verify</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
