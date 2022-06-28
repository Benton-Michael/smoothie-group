import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("----------");
        console.log("res", res.data);
        console.log("----------");
        console.log(res.data.user._id);
        setIsLoggedIn(res.data.user._id);
        console.log("----------");
        console.log("IsLoggedIn", isLoggedIn);
        console.log("----------");
        navigate("/new");
      })
      .catch((err) => {
        console.log("error in login", err.response.data.message);
        setErrors(err.res.data.message);
        console.log("attempt to set Errors", errors);
      });
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl mb-4 text-center">Log In</h3>
        <div className="mb-4">
          <label
            htmlFor="email-login"
            className="block text-gray-700 text-sm mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email-login"
            value={user.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password-login"
            className="block text-gray-700 text-sm mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password-login"
            value={user.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
          {errors && <p>{errors}</p>}
        </div>
        <button
          type="submit"
          className="dark:bg-green-800 hover:bg-slate-400 text-white py-2 px-2  rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
