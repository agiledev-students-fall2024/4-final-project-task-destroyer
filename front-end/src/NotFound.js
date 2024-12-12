import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
       <div className="container">
            <br></br>
            <h1>404 - Not Found!</h1>
            <Link to="/Login" className="menu-btn">Go Home</Link>
       </div> 
    );
}; 

export default NotFound;
