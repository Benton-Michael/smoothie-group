import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const allSmoothies = (props) => {

    const { user, setUser } = useState({})
    const { deleteHandler, smoothies } = props;

    useEffect(() => {

        const userToken = Cookies.get("userToken")

        if (userToken) {
            const user = jwtDecode(userToken);
            setUser(user);
        }
    }, []);


    return (
        <div>

            <h3>All Smoothies</h3>

            <table>

                <thead>
                    
                    <tr>
                        <th scope="col"className=""> Quanitity  </th>

                        <th scope="col"className=""> Size  </th>

                        <th scope="col"className=""> Delivering By:  </th>

                        <th scope="col"className=""> With fresh and tasty: </th>

                        <th scope="col"className=""> Order Actions </th>


                    </tr>
                
                </thead>


            </table>


        </div>



    )
}

export default allSmoothies