import React from 'react';
import { useState } from "react";
import email_id_input from "../assets/email_id_input.png";
import password_input from "../assets/password_input.png";
import { useNavigate } from "react-router-dom";

function RegisterCenterContent() {
  const [Student_Name, setName] = useState("");
  const [Student_ID, setId] = useState("");
  const [Email, setEmail] = useState("");
  const [Department, setDepartment] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = {
      Student_ID: parseFloat(Student_ID),
      Student_Name,
      Department,
      Password,
      Email,
    };

    try {
      const userData = await fetch(
        "https://au-hallbooking-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (userData.status === 201) {
        const token = await userData.json();
        localStorage.setItem("authToken", JSON.stringify(token));
        console.log("Token stored...");
        navigate("/student/dashboard");
      } else {
        alert("Registration failed, please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 my-20">
      <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Register
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Register Number
              </label>
              <input
                onChange={(e) => setId(e.target.value)}
                type="text"
                name="Student_ID"
                className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10 p-2.5"
                placeholder="Enter your Register Number"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Applicant Name
              </label>
              <input
                type="text"
                name="Student_Name"
                onChange={(e) => setName(e.target.value)}
                className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10 p-2.5"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Department
              </label>
              <select
                name="Department"
                className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10 p-2.5"
                required
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option>Select your department</option>
                <option>Department of Mathematics</option>
                <option>Department of Computer Science</option>
                <option>Department of Information Science and Technology</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email ID
              </label>
              <div className="flex">
                <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                  <img
                    src={email_id_input}
                    className="h-5"
                    alt="email-icon"
                  />
                </div>
                <input
                  type="email"
                  name="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-100 text-blue sm:text-sm rounded-sm block w-full h-10 p-2.5"
                  placeholder="student@domain.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="flex">
                <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                  <img
                    src={password_input}
                    className="h-5"
                    alt="lock-icon"
                  />
                </div>
                <input
                  type="password"
                  name="Password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-neutral-100 rounded-sm block w-full h-10 p-2.5"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="flex">
                <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                  <img
                    src={password_input}
                    className="h-5"
                    alt="lock-icon"
                  />
                </div>
                <input
                  type="password"
                  name="ConfirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-neutral-100 rounded-sm block w-full h-10 p-2.5"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-sky-500 hover:underline"
                >
                  Login
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterCenterContent;
