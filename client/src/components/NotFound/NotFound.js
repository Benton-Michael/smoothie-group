import React from 'react';
import Image from './NotFound.css'

const NotFound = () => {
    return (
        <div className="main-area">
            <div className="image"></div>
            <div>
                <p >Page Not Found</p>
                <a href="https://storyset.com/web" target="_blank">Web illustrations by Storyset</a>
            </div>
        </div>
    );
};

export default NotFound;