import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

const OrderDetails = (props) => {
    const [cart, setCart] = useState([]);
    const {id} = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:5001/api/user/cart`, {withCredentials: true})
            .then( res => {
                console.log(res.data)
                setCart(res.data.cart);
            })
            .catch( err => console.log(err) )
    }, [id])
    console.log(user)
    return (
        <div>
            <h2>Order Details:</h2>
            {
                cart.map((order, index) => {
                    return(
                        <div key={index}>
                            <p>Method:  </p><p>{order.method}</p>
                            <p>Size:  {order.size}</p>
                            <p>Quantity:  {order.quantity}</p>
                            <p>Extras:  {order.extras}</p>
                            <p>{order.fruits}</p>
                            <p>{order.veggies}</p>
                        </div>
                    )
                })
            }
            <h3>Order Total:  </h3>
        </div>
    )
}


export default OrderDetails;