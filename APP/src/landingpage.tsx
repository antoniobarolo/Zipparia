import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nada() {
	return (
		<>
			<h1>Zipparia</h1>
			<div className="formLogin">
				<label htmlFor="">Login</label>
				<input type="text"/>
				<label htmlFor="">Senha</label>
				<input type="text"/>
				<button><Link to="/">Entrar</Link></button>
			</div>
		</>
	);
}

export default Nada;
