import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/LoginReg/register.css";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://hearthhandfullstack.onrender.com/signup/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );

      toast.success(response.data?.message || "Registered successfully!");
      setTimeout(() => navigate("/home"), 1000);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Signup error:", error?.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <div className="signup-header">
          <div className="signup-brand">
            <img
              className="signup-logo"
              src="/logo.png"
              alt="HearthHand Logo"
            />
            <h5 className="signup-brand-name">HearthHand</h5>
          </div>
          <Link to={"/"}>
            <button className="signup-login-btn">Login</button>
          </Link>
        </div>

        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">Enter your details to proceed further</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="input-icon">
                <IoPersonOutline />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="input-icon">
                <MdOutlineEmail />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="input-icon">
                <RiLockPasswordLine />
              </span>
            </div>
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              className="remember-checkbox"
            />
            <label htmlFor="remember" className="remember-label">
              Remember me
            </label>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <Link to={"/home"} className="guest-login-link">
          <p className="guest-login-text">Guest Login</p>
        </Link>

        <div className="divider">
          <span className="divider-text">Or</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn google-btn">
            <FcGoogle className="social-icon" />
            Sign Up with Google
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
