import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAllSmoothies = () => {
  const [smoothies, setSmoothies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/smoothies")
      .then((res) => {
        console.log("Issue Setting the Smoothies", res.data);
        setSmoothies(res.data);
      })
      .catch((err) => {
        console.log("error in retreiving all smoothies", err);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
        <div className="py-3 px-6 border-b border-gray-300">All Smoothies</div>
        {smoothies.map((smoothie, index) => (
          <div className="p-6 mb-4">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {smoothie.name}
            </h5>
            <div>
              <div>
                <ul className="mb-2 p-3" key={index}>
                  <li>Quantity: {smoothie.quanity}</li>
                  <li>Size: {smoothie.size}</li>
                  {/* <li></li> */}
                  <li>{smoothie.liquid}</li>
                  <li>{smoothie.fruits}</li>
                  <li>{smoothie.veggies}</li>
                  <li>{smoothie.extras}</li>
                </ul>
              </div>
              <Link to={`/details/`}>
                <span> Add Smoothie to Cart</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllSmoothies;
