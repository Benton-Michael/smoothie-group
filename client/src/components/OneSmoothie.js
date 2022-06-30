import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OneSmoothie = (props) => {
  const [smoothie, setSmoothie] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/smoothie/${id}`)
      .then((res) => {
        console.log(res.data);
        setSmoothie(res.data);
        console.log(res.data.fruits);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const addSmoothieToCart = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5001/api/add/cart`,
        { smoothie },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/details");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center">
      <div className="p-2 mb-4 mx-4 block rounded-lg shadow-lg bg-white text-center w-96 ring-2 ring-gray-500 mt-4">
        <h1 className="text-xl font-bold mb-2 border-b-2">{smoothie.name}</h1>
        <p>
          <span className="font-medium pb-2">Method:</span>
          {smoothie.method}
        </p>
        <p>
          <span className="font-medium pb-2">Size:</span> {smoothie.size}
        </p>
        <div>
          <div>
            <p>
              <span className="font-medium pb-2">Quantity:</span>
              {smoothie.quantity}
            </p>
            <p>
              <span className="font-medium pb-2">Liquid:</span>
              {smoothie.liquid}
            </p>
            <p className="border-t-2 font-medium">Fruits:</p>
            {smoothie.fruits?.map((fruit) => (
              <p>{fruit}</p>
            ))}
            <p className="border-t-2 font-medium">Veggies:</p>
            {smoothie.veggies?.map((veggie) => (
              <p>{veggie}</p>
            ))}
            <p className="border-t-2 font-medium">Extras:</p>
            {smoothie.extras?.map((extra) => (
              <p>{extra}</p>
            ))}
          </div>
          <button
            onClick={addSmoothieToCart}
            className="dark:bg-green-800 hover:bg-slate-400 text-white py-1 px-1 rounded mt-2"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default OneSmoothie;
