import React, { useState } from "react";
import axios from "axios";
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

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-2xl font-bold text-orange-500 mb-2">Vingo</h1>
        <p className="text-gray-500 mb-6">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer"
            >
              👁️
            </span>
          </div>

  
          {/* Role */}
          <div className="flex gap-2">  
            {["user", "admin", "deliveryBoy"].map((role) => (
              <button
                type="button"
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`flex-1 py-2 border rounded-lg ${formData.role === role ? "bg-orange-500 text-white" : ""
                  }`}
              >
                {role}
              </button>
            ))}
          </div>



          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
