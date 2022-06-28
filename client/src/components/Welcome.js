import React from 'react';
import Register from "./Register"
import Login from "./Login"
const Welcome = (props) => {
    const {setIsLoggedIn} = props;
    return (
        <div className='flex justify-evenly items-center pt-5 w-full h-full'>
            <Register setIsLoggedIn={setIsLoggedIn}/>
            <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
};

export default Welcome;
