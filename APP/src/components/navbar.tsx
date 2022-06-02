import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h1>Zipparia</h1>
            <ul>
                <Link to="/home">Zippas</Link>
                <Link to="/pedidos">Pedidos</Link>
            </ul>
        </nav>
    );
}

export default Navbar;
