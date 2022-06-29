import React, { useState, useEffect } from "react";
import axios from "axios";

const GetAllSmoothies = () => {
  const [smoothies, setSmoothies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/smoothies")
      .then((res) => {
        setSmoothies(res.data);
        console.log("Setting", res.data)
      })
      .catch((err) => {
        console.log("error in retreiving all smoothies", err);
      });
  }, []);

  return (
  <div>
     {smoothies.map((smoothie, index) => (
        <div key={index}>
        <p>
            {smoothie.method}
            
       </p>
       <p>  </p>
       </div>
     ))}
    

  </div>


    );
};

export default GetAllSmoothies;
