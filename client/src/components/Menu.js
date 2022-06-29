import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const [user, setUser] = useState(null);
  const { isLoggedIn } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
      console.log("--------");
      console.log(user);
      console.log(isLoggedIn);
      console.log("--------");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios
      .post("http://localhost:5001/logout", {}, { withCredentials: true })
      .then((res) => {
        Cookies.remove("userToken");
        setUser(null);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="dark:bg-green-800 w-[100%] h-20 justify-between flex drop-shadow-lg items-center">
      <div className="items-center ml-6 flex">
        <h1 className="text-white text-3xl text-center ml-4 mt-1">
          SipSpace Smoothies
        </h1>
      </div>
      
      <div>
        
          <div className="flex w-full mr-2 items-center">
              <div>
      <div>
        {user && user ? (
          <div className="flex w-full mr-2 items-center">
            <p className="text-white text-lg mr-4">
              {" "}
              Welcome Back, {user.firstName}!
            </p>
            <button onClick={handleLogout} className="ml-4 text-white">
              Logout
            </button>
            </div>
            ) : null}
            <Link to={"/"} className="text-white"/>
            <Link to={"/all"} className="text-white">
              Home
            </Link>
            <Link to={"/new"} className="ml-4 text-white">
              Order
            </Link>
            <Link to={"/account"} className="ml-4 text-white">
              Account
            </Link>
            
          </div>
      </div>
            </div>
      </div>
    </div>
  );
};

export default Menu;
