import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h1>Zipparia</h1>
            <ul>
                <Link to="/home">Zippas</Link>
                <br />
                <Link to="/pedidos">Pedidos</Link>
            </ul>
        </nav>
    );
}

export default Navbar;
