import React, {useState, useEffect} from 'react';
import axios from 'axios';


const OrderDetails = (props) => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5001/api/users/cart')
            .then(res => {
                console.log(res.data)
                setCart(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h2>Order Details:</h2>
            {
                cart.map((order, index) => {
                    return(
                        <div key={index}>
                            <p>Method:  {order.method}</p>
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