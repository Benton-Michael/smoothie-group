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
  const { id } = useParams();
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
        console.log("Setting", res.data)
      })
      .catch((err) => {
        console.log("error in retreiving all smoothies", err);
      });
  }, []);

  const addSmoothieToCart = e => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/add/cart/${id}`, {cart: cart}, {withCredentials: true})
      .then((res) => {
        console.log(res.data.cart, user)
        setCart([...cart, res.data.cart])
        navigate("/details")
        console.log(cart)
      })
      .catch(err => {
        console.log(err)
      })
  }
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

          <button onClick={addSmoothieToCart}>Add To Cart</button>

          {/* <Link to={`/details`}>
            <span> Add Smoothie to Cart</span>
            </Link> */}
          </div>
        
        </div>
  ))}
      </div>
    </div>
  );
};

export default GetAllSmoothies;
