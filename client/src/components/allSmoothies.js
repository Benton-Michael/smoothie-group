import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import DeleteButton from "./DeleteButton";

const AllSmoothies = (props) => {
  const { deleteHandler, smoothies } = props;
  const { user, setUser } = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
    }
  }, []);

//   return (
    // <div>
    //   <br />

    //   <h3>All Smoothies</h3>
    //   <br />

    //   <table>
    //     <thead>
    //       <tr>
    //         <th scope="col">
    //           Quanitity:
    //         </th>

    //         <th scope="col">
    //           Size:{" "}
    //         </th>

    //         <th scope="col">
    //           Receiving via method:{" "}
    //         </th>

    //         <th scope="col">
    //           {" "}
    //           With fresh and tasty:{" "}
    //         </th>

    //         <th scope="col">
    //           {" "}
    //           Order Actions{" "}
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {smoothies.map((smoothie, index) => (
    //         <tr key={index}>
    //           <td>{smoothie.quantity}</td>
    //           <td>{smoothie.size}</td>
    //           <td>{smoothie.method}</td>
    //           <td>
    //             {smoothie.liquid} + {smoothie.fruits} + {smoothie.veggies} and{" "}
    //             {smoothie.extras}{" "}
    //           </td>
    //           {user._id === smoothie.createdBy._id ? (
    //             <td>
    //               <Link to={`/view/${smoothie._id}`}>View </Link>
    //               <span> | </span>

    //               <Link to={`/edit/${smoothie._id}`}>Edit</Link>
    //               <span> | </span>
    //               <DeleteButton
    //                 id={smoothie._id}
    //                 deleteHandler={deleteHandler}
    //               />
    //             </td>
    //           ) : (
    //             <td>
    //               <Link to={`/view/${smoothie._id}`}>View</Link>
    //             </td>
    //           )}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
//   );
};

export default AllSmoothies;