import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const Order = (props) => {
    const { cart, setCart, isLoggedIn } = props;
    const [ordered, setOrdered] = useState([]);


    useEffect(() => {
        const userToken = Cookies.get("userToken");
        if (userToken) {
            const user = jwtDecode(userToken);
            setUser(user);
            console.log("--------");
            }
        }, [isLoggedIn]);

    useEffect(() => {
        axios.get(`http://localhost:5001/api/user/cart`, {withCredentials: true})
            .then( res => {
                console.log(res.data)
                setCart(res.data.cart);
            })
            .catch( err => console.log(err) )
    }, [id])

    

    return (
        <div>
            <h2>Order</h2>
            <div>Create your own Smoothie</div>
            <div>Smoothie Products</div>



        </div>
    )
}

export default Order