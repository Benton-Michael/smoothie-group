import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
// import {Link} from 'react-router-dom';
const Welcome = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(false);
  };
  const handleUntoggle = () => {
    setToggle(true);
  };
  return (
    <div className="flex justify-evenly items-center pt-5 w-full h-full">
      {toggle ? (
        <div>
          <Register setIsLoggedIn={setIsLoggedIn} />
          <button onClick={handleToggle}>
            Already have an account? Login here!
          </button>
        </div>
      ) : (
        <div>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <button onClick={handleUntoggle}>
            Don't have an account? Register here!
          </button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
