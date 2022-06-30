import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = (props) => {
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/user/cart`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setCart(res.data.cart);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(user);
  return (
    <div className="flex justify-center">
      <div className="p-2 mb-4 mx-4 block rounded-lg shadow-lg bg-white text-center w-96 ring-2 ring-gray-500 mt-4">
        <h2 className="text-l font-bold mb-2 border-b-2">Order Details:</h2>
        {cart.map((order, index) => {
          return (
            <div key={index}>
              <h1>{order.name}</h1>
              <p>Method: {order.method}</p>
              <p>Size: {order.size}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Extras: {order.extras}</p>
              <p>Fruits: {order.fruits}</p>
              <p>Veggies: {order.veggies}</p>
            </div>
          );
        })}
        <h3>Order Total: </h3>
      </div>
    </div>
  );
};
    // const [cart, setCart] = useState([]);
    // const {id} = useParams();
    // useEffect(() => {
    //     axios.get(`http://localhost:5001/api/user/cart`, {withCredentials: true})
    //         .then( res => {
    //             console.log(res.data)
    //             setCart(res.data.cart);
    //         })
    //         .catch( err => console.log(err) )
    // }, [id])
    // return (
    //     <div>
    //         <h2>Order Details:</h2>
    //         {
    //             cart.map((order, index) => {
    //                 return(
    //                     <div key={index}>
    //                         <h1>{order.name}</h1>
    //                         <p>Method:  </p><p>{order.method}</p>
    //                         <p>Size:  {order.size}</p>
    //                         <p>Quantity:  {order.quantity}</p>
    //                         <p>Extras:  {order.extras}</p>
    //                         <p>{order.fruits}</p>
    //                         <p>{order.veggies}</p>
    //                     </div>
    //                 )
    //             })
    //         }
    //         <h3>Order Total:  </h3>
    //     </div>
    // )
// }

export default OrderDetails;
