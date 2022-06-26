import React from 'react';
import Image from './NotFound.css'

const NotFound = () => {
    return (
        <div className="main-area bg-dark">
            <div className="image"></div>
            <div className="bg-dark">
                <p >Page Not Found</p>
                <a href="https://storyset.com/web" target="_blank">Web illustrations by Storyset</a>
            </div>
        </div>
    );
};

export default NotFound;