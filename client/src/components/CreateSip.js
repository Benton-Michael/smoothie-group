import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const CreateSip = (props) => {
  const { allSmoothies, setAllSmoothies } = props;
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [liquid, setLiquid] = useState("");
  const [fruits, setFruits] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [extras, setExtras] = useState([]);
  // const [fruitsObj, setFruitsObj] = useState({
  //   tropicalFruit: false,
  //   mixedBerry: false,
  //   mango: false,
  //   pomegranite: false,
  //   acaiBerry: false,
  //   blueberry: false,
  //   banana: false,
  //   raspberry: false,
  //   pineapple: false,
  //   orange: false
  // });
  // const [veggiesObj, setVeggiesObj] = useState({
  //   kale: false,
  //   swissChard: false,
  //   avocado: false,
  //   cucumber: false,
  //   spinach: false,
  //   mint: false,
  //   winterSquash: false,
  //   beets: false,
  //   celery: false
  // });
  // const [extrasObj, setExtrasObj] = useState({
  //   proteinPowderChoc: false,
  //   proteinPowderVan: false,
  //   chia: false,
  //   aloe: false,
  //   cinnamon: false,
  //   cayenne: false,
  //   flax: false,
  //   gojiBerry: false,
  //   hemp: false
  // });
  const [favorited, setFavorited] = useState(false);
  const navigate = useNavigate();


  // const [fruitsCheckedState, setFruitsCheckedStated] = useState(
  // new Array(fruits.length).fill(false)
  // );
  // const [isChecked, setIsChecked] = useState(false);
  // const handleAllFruit = (e) => {
  //   setIsChecked(!isChecked);
  //   setFruitsObj({...fruitsObj, [e.target.id]: !isChecked});
    
  //   // console.log('veggies', veggies);
  //   // console.log('extras', extras);
  // };
  // console.log(isChecked);
  // console.log('fruits-Object-TEST', fruitsObj);
  // console.log(checkedState);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/smoothie", {
        name,
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
        setName("");
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

  const fruitHandler = (e) => {
    console.log(e.target.value)
    if (!fruits.includes(e.target.value)){
      setFruits([...fruits, e.target.value]);
    } else if (fruits.includes(e.target.value)){
      const tgtFruit = e.target.value;
      const filterFruits = fruits.filter(_ => _ !==tgtFruit);
      setFruits(filterFruits);
    }
  }
  const vegHandler = (e) => {
    console.log(e.target.value)
    if (!veggies.includes(e.target.value)){
        setVeggies([...veggies, e.target.value]);
    } else if (veggies.includes(e.target.value)){
      const tgtVeg = e.target.value;
      const filterVegs = veggies.filter(_ => _ !== tgtVeg);
      setVeggies(filterVegs);
    }
  }

  const extraHandler = (e) => {
    // let extrasArr = [];
    console.log(e.target.value)
    if (!extras.includes(e.target.value)){
        setExtras([...extras, e.target.value]);
    } else if (extras.includes(e.target.value)) {
      const tgtExtra = e.target.value
      // console.log('====removing etra', targetExtra)
      const filterExtras = extras.filter(_ => _ !==tgtExtra)
      // console.log('====filteredExtras', filterExtras)
      setExtras(filterExtras)
      // setExtras(extras.filter((e.target.value) ));
    }
  }

  console.log('---------testing array-------')
  console.log('fruits-array',fruits);
  console.log('veggies-array', veggies);
  console.log('extras-array', extras);


  return (
    <div className="flex justify-center mt-4">
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-8">
        <h3 className="text-2xl mb-4 text-center">Create your own favorite smoothie</h3>
        <section className="flex justify-between items-center pb-2">
          <label className="col-3" htmlFor="name">
            Name:{" "}
          </label>
          <input
            type="Text"
            className="form-control"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </section>
        <section className="flex justify-between items-center pb-2">
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
        <section className="flex justify-between items-center pb-2">
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
        <section className="flex justify-between items-center pb-2">
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
        <hr className="my-3"/>
        <section className="flex justify-between items-center pb-2">
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
        <section>
            <label className="form-label col-3" htmlFor="fruits">Fruits:{" "}</label>
            <div className="grid grid-cols-5">
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="tropicalFruit" value="tropicalFruit" onChange={fruitHandler}/>
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="tropicalFruit">Tropical Fruit</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="mixedBerry" value="mixedBerry" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="mixedBerry">Mixed Berry</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="mango" value="mango" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="mango">Mango</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="pomegranite" value="pomegranite" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="pomegranite">Pomegranite</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="acaiBerry" value="acaiBerry" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="acaiBerry">Acai Berry</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="blueberry" value="blueberry" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="blueberry">Blueberry</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="banana" value="banana" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="banana">Banana</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="raspberry" value="raspberry" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="raspberry">Raspberry</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="pineapple" value="pineapple" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="pineapple">Pineapple</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="orange" value="orange" onChange={fruitHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="orange">Orange</label>
                </div>
            </div>
        </section>
        <hr className="my-3"/>
        <section>
            <label className="form-label col-3" htmlFor="veggies">Veggies:{" "}</label>
            <div className="grid grid-cols-5">
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="kale" value="kale" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="kale">Kale</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="swissChard" value="swissChard" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="swissChard">Swiss Chard</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="avocado" value="avocado" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="avocado">Avocado</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="cucumber" value="cucumber" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="cucumber">Cucumber</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="spinach" value="spinach" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="spinach">Spinach</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="mint" value="mint" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="mint">Mint</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="winterSquash" value="winterSquash" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="winterSquash">Squash</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="beets" value="beets" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="beets">Beets</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="celery" value="celery" onChange={vegHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="celery">Celery</label>
                </div>
            </div>
        </section>
        <hr className="my-3"/>
        <section>
        <label className="form-label" htmlFor="extras">Extras:{" "}</label>
            <div className="grid grid-cols-5">
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="proteinPowderChoc" value="proteinPowderChoc" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="proteinPowderChoc">Chocolate Protein Powder</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id=" proteinPowderVan" value=" proteinPowderVan" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor=" proteinPowderVan">Vanilla Protein Powder</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="chia" value="chia" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="chia">Chia</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="aloe" value="aloe" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="aloe">Aloe</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="cinnamon" value="cinnamon" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="cinnamon">Cinnamon</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="cayenne" value="cayenne" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="cayenne">Cayenne</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="flax" value="flax" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="flax">Flax</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="gojiBerry" value="gojiBerry" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="gojiBerry">Goji Berry</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input px-1 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="hemp" value="hemp" onChange={extraHandler} />
                  <label className="form-check-label px-1 mr-1 inline-block text-gray-800" htmlFor="hemp">Hemp</label>
                </div>
            </div>
        </section>
        <input type="submit" value="Create" className="btn btn-primary mt-3" />
      </form>
    </div>
  );
};

export default CreateSip;
