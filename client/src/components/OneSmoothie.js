import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, useNavigate} from "react-router-dom";

const OneSmoothie = (props) => {
    const [smoothie, setSmoothie] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:5001/api/smoothie/${id}`)
            .then( res => {
                console.log(res.data)
                setSmoothie(res.data);
            })
            .catch( err => console.log(err) )
    }, [id])
const addSmoothieToCart = e => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/add/cart`, {smoothie}, {withCredentials: true})
        .then((res) => {
        console.log(res.data)
        navigate("/details")
        })
        .catch(err => {
        console.log(err)
        })
    }
    return (
        <div>
            <h1>{smoothie.name}</h1>
            <p>{smoothie.method}</p>
            <p>{smoothie.size}</p>
            <div>
                <div>
                    <p>{smoothie.quantity}</p>
                    <p>{smoothie.liquid}</p>
                    <p>{smoothie.fruits}</p>
                    <p>{smoothie.veggies}</p>
                    <p>{smoothie.extras}</p>
                </div>
                <button onClick={addSmoothieToCart}>Add To Cart</button>
            </div>
        </div>
    )
}
export default OneSmoothie;