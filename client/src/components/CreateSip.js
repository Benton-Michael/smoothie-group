import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const CreateSip = (props) => {
  const { allSmoothies, setAllSmoothies } = props;
  const [method, setMethod] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [liquid, setLiquid] = useState("");
  const [fruits, setFruits] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [extras, setExtras] = useState([]);
  const [favorited, setFavorited] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/smoothie", {
        method,
        size,
        quantity,
        liquid,
        fruits,
        veggies,
        extras,
        favorited,
      })
      .then((res) => {
        //add smoothie to smoothie list
        setAllSmoothies([...allSmoothies, res.data]);
        console.log("Added: ", res.data);
        //reset form fields
        setMethod("");
        setSize("");
        setQuantity(0);
        setFruits([]);
        setVeggies([]);
        setExtras([]);
        setFavorited(false);
        //navigate to home page after submission
        navigate("/");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <>
      <h3>Create your Favorite Smoothie</h3>
      <form onSubmit={submitHandler} className="form SipForm">
        <section className="input-area d-flex align-items-center">
          <label className="form-label col-3" htmlFor="method">
            Method:{" "}
          </label>
          <select
            name="method"
            id="method"
            value={method}
            className="form-control"
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="Pick-up">Pick-up</option>
            <option value="Delivery">Delivery</option>
          </select>
        </section>
        <section className="input-area d-flex align-items-center">
          <label className="col-3" htmlFor="size">
            Size:{" "}
          </label>
          <select
            name="size"
            id="size"
            value={size}
            className="form-control"
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="SuperSip">SuperSip</option>
          </select>
        </section>
        <section className="input-area d-flex align-items-center">
          <label className="col-3" htmlFor="quantity">
            Qty:{" "}
          </label>
          <input
            type="Number"
            className="form-control"
            value={quantity}
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </section>
        <section className="input-area d-flex align-items-center">
          <label className="form-label col-3" htmlFor="liquid">
            Liquid (Base):{" "}
          </label>
          <select
            name="liquid"
            id="liquid"
            value={liquid}
            className="form-control"
            onChange={(e) => setLiquid(e.target.value)}
          >
            <option value="Fruit Juice">Fruit Juice</option>
            <option value="Soy Milk">Soy Milk</option>
            <option value="Milk">Milk</option>
            <option value="Oat Milk">Oat Milk</option>
            <option value="Yogurt">Yogurt</option>
            <option value="Ice-Cream">Ice-Cream</option>
          </select>
        </section>
        <input type="submit" value="Create" className="btn btn-primary mt-3" />
      </form>
    </>
  );
};

export default CreateSip;
