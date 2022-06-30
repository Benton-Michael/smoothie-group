import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = (props) => {
    const [smoothie, setSmoothie] = useState("");
    const [cart, setCart] = useState([]);
    const [orderedSmoothies, setOrderedSmoothies] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

    const addToOrder = (e) => {
        e.preventDefault();
        axios
        .put(
        `http://localhost:5001/api/users/orders/smoothies`,
        { smoothie },
        { withCredentials: true }
        )
        .then((res) => {
            console.log('add to order', res.data);
            setOrderedSmoothies(res.data);
            navigate("/account");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    console.log('order:', orderedSmoothies);

    const orderTotal = () => {
        //sum all prices in cart
    }


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
        <button onClick={addToOrder} className="btn">Confirm Order</button>
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
