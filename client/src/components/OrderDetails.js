import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const OrderDetails = (props) => {
    const [cart, setCart] = useState([]);
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const { isLoggedIn } = props;
    const navigate = useNavigate();
    // useEffect(() => {
    //     const userToken = Cookies.get("userToken");
    //     if (userToken) {
    //         const user = jwtDecode(userToken);
    //         setUser(user);
    //         setCart(user.cart)
    //         console.log("--------");
    //         console.log(cart);
    //         // console.log(isLoggedIn);
    //         console.log("--------");
    // //     }
    // }, [isLoggedIn]);
    useEffect(() => {
        axios.get(`http://localhost:5001/api/users`)
            .then( res => {
                console.log(res.data)
                setCart(res.data);
            })
            .catch( err => console.log(err) )
    }, [id])
    console.log(user)
    return (
        <div>
            <h2>Order Details:</h2>
            {
                // cart.map((order, index) => {
                //     return(
                //         <div key={index}>
                //             <p>Method:  </p><p>{order.method}</p>
                //             <p>Size:  {order.size}</p>
                //             <p>Quantity:  {order.quantity}</p>
                //             <p>Extras:  </p>
                //         </div>
                //     )
                // })
            }
            <h3>Order Total:  </h3>
        </div>
    )
}


export default OrderDetails;