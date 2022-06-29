import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";

const Account = (props) => {
    const [user, setUser] = useState('');
    const { isLoggedIn } = props;
    console.log(user);
    const navigate = useNavigate();
    useEffect(() => {
        const userToken = Cookies.get("userToken");
        if (userToken) {
            const user = jwtDecode(userToken);
            setUser(user);
        }
    }, [isLoggedIn]);

    return (
        <div>
            <div className="flex justify-center mt-4">
                <div className="flex flex-col md:flex-row rounded-lg bg-white shadow-lg m-6">
                    <div className="avatar">
                    <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    className="rounded-full w-64 m-4 shadow-lg"
                    alt="Avatar"
                    />
                    </div>
                    <div className="p-6 flex flex-col justify-start">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">{user.firstName} {user.lastName}</h5>
                        <p className="text-gray-700 text-base mb-4">{user.email}</p>
                        <p className="text-gray-600 text-xs border-t border-gray-300">Last Updated <Moment format="MM/DD/YYYY" date={user.updatedAt} /></p>
                        <p className="text-gray-600 text-xs">User Created <Moment format="MM/DD/YYYY" date={user.createdAt} /></p>
                        <div className="py-3 px-6  text-gray-600">
                        {/* <button type="button" 
                        className="dark:bg-green-800 hover:bg-slate-400 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline" >
                            Edit
                        </button> */}
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="flex justify-around grid grid-cols-2">
                <div className="flex justify-center">
                    <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                        <div className="py-3 px-6 border-b border-gray-300">Orders</div>
                        <div className="p-6">
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Your recent orders</h5>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                        <thead className="bg-white border-b">
                                            <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Smoothie
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Size
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Order Date
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Banana/Mango
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Small
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                6/27/2022
                                            </td>
                                            </tr>
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Mixed Berry
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Large
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                6/24/2022
                                            </td>
                                            </tr>
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Tropical Fruit
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                SuperSip
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                6/21/2022
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                        <div className="py-3 px-6 border-b border-gray-300">Favorites</div>
                        <div className="p-6">
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Smoothies you've favorited</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account