import React from 'react';
import '../css/Navbar.css'
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div className="navbar-container">
            <ul className="nav-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/transactions">Transactions</NavLink></li>
            </ul>
            </div>
        </nav>
    );
}

export default Navbar;
