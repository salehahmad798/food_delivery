import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { serverUrl } from "../App";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );

      console.log(res.data);
      alert("Signup Successful!");

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Signup Failed!");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${serverUrl}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-2xl font-bold text-orange-500 mb-2">Vingo</h1>
        <p className="text-gray-500 mb-6">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer"
            >
              👁️
            </span>
          </div>

          {/* Role Selection */}
          <div className="flex gap-2">
            {["user", "admin", "deliveryBoy"].map((role) => (
              <button
                type="button"
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`flex-1 py-2 border rounded-lg ${
                  formData.role === role
                    ? "bg-orange-500 text-white"
                    : "bg-white"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-orange-500 font-medium">
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;