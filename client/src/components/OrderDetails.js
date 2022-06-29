import React, {useState, useEffect} from 'react';
import axios from 'axios';


const OrderDetails = (props) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5001/api')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
    }, [])

    return (
        <div>
            <h2>Order Details:</h2>
            {
                users.map((user, index) => {
                    return(
                        <div key={index}>
                            <p>Method:  {user.method}</p>
                            <p>Size:  {user.size}</p>
                            <p>Quantity:  </p>
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