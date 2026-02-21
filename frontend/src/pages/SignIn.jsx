import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { serverUrl } from "../App";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signin`,
        formData,
        { withCredentials: true }
      );

      console.log(res.data);
      alert("Login Successful!");

      // Optional: redirect after login
      // window.location.href = "/";

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Login Failed!");
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = `${serverUrl}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-2xl font-bold text-orange-500 mb-2">Vingo</h1>
        <p className="text-gray-500 mb-6">
          Welcome back! Please sign in
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

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

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-orange-500">
              Forgot Password?
            </Link>
            
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-medium">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignIn;