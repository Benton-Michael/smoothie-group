import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const GetAllSmoothies = (props) => {
  const [smoothies, setSmoothies] = useState([]);
  const [user, setUser] = useState(null);
  const { isLoggedIn } = props;
  const navigate = useNavigate();
  const [smoothie, setSmoothie] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
      console.log("--------");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/smoothies")
      .then((res) => {
        setSmoothies(res.data);
        setSmoothie(res.data)
        console.log("Setting", res.data)
        console.log("======================")
        console.log(res.data?._id)
        console.log("Setting", res.data);
      })
      .catch((err) => {
        console.log("error in retreiving all smoothies", err);
      });
  }, []);

  
  return (
    <div className="text-center">
      <h1 className="py-3 px-6 border-b border-gray-300 text-2xl font-medium">
        All Smoothies
      </h1>
      <div className="grid ">
        <div className="justify-center rounded-lg m-4 shadow-lg bg-white text-center grid grid-cols-3 place-items-center">
          {smoothies.map((smoothie, index) => (
            <div
              key={index}
              className="p-2 mb-4 mx-4 block rounded-lg shadow-lg bg-white text-center w-96 ring-2 ring-gray-500 mt-4">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                <Link to={`/smoothie/${smoothie._id}`}>
                  {smoothie.name}
                </Link>
              </h5>
              <div>
                <div>
                  <ul className="mb-2 p-3">
                    <li>Size: {smoothie.size}</li>
                    <li>Base: {smoothie.liquid}</li>
                    <hr />
                    <li>
                      <h5 className="font-medium">Fruits:</h5>
                      {smoothie.fruits.map((fruit, i) => (
                        <p>{fruit}</p>
                      ))}
                    </li>
                    <hr />
                    <li>
                      <h5 className="font-medium">Veggies:</h5>
                      {smoothie.veggies.map((veg, i) => (
                        <p>{veg}</p>
                      ))}
                    </li>
                    <hr />
                    <li>
                      <h5 className="font-medium">Extras:</h5>
                      {smoothie.extras.map((ex, i) => (
                        <p>{ex}</p>
                      ))}
                    </li>
                    <hr />
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetAllSmoothies;
