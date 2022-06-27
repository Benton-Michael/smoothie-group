import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const { setIsLoggedIn } = props;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("response", res.data);
        setIsLoggedIn(true);
        navigate("/new");
      })
      .catch((err) => {
        console.log("Error in registration", err.response);
        setErrors(err.response.data.errors);
        console.log("register errors", errors);
      });
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  flex flex-col justify-center items-center"
      >
        <br />
        <h3 className="text-2xl mb-4 text-center">Create Account</h3>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm mb-2"
          >
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            id="firstName"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm mb-2"
          >
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            id="lastName"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
            Email Address:
          </label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            id="email"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm mb-2"
          >
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            id="password"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm mb-2"
          >
            Confirm Password:
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            className="shadow appearance-none border rounded w-[] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button
          type="Submit"
          className="dark:bg-green-800 hover:bg-slate-400 text-white py-2 px-2  rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
