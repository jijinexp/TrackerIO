import React from 'react';
import '../css/Navbar.css'

function Navbar() {
    return (
        <nav>
            <div className="navbar-container">
            <ul className="nav-links">
                <li><a href="/home">Home</a></li>
                <li><a href="/transactions">Transactions</a></li>
            </ul>
            </div>
        </nav>
    );
}

export default Navbar;
