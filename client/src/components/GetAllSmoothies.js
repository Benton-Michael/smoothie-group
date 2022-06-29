import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

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
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
        
           
          </h5>

          {smoothies.length > 0 ? 
            smoothies.map((smoothie, index) => {
              return(
              <ul key={index}>
           
                <li>{smoothie.quantity}</li>
                <li> {smoothie.liquid}</li>
                <li> {smoothie.object}</li>
                {
                smoothie.VeggiesList().length > 0 ? 
                smoothie.VeggiesList().map((veggie, idx) => {
                    return(<li>{veggie} </li>)  
                }): ''
                }
                {/* <li> {smoothie.extras}</li> */}
                <li> {smoothie.method}</li>
              </ul>
              
          )  }): ''  }
        </div>
      </div>
    </div>
  );
};

export default GetAllSmoothies;
