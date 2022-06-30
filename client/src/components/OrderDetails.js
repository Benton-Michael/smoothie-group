import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

const OrderDetails = (props) => {
    const [cart, setCart] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/`)
            .then( res => {
                console.log(res.data)
                setCart(res.data.cart);
            })
            .catch( err => console.log(err) )
    }, [id])

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
                            <p>Extras:  </p>
                        </div>
                    )
                })
            }
            <h3>Order Total:  </h3>
        </div>
    )
}


export default OrderDetails;