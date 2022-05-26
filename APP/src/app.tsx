import React, { useState } from "react";
import { Link } from "react-router-dom";

function App() {

	return (
		<div>
			<h1>Zipparia</h1>
			<div className="formLogin">
				<label htmlFor="">Login</label>
				<input type="text"/>
				<label htmlFor="">Senha</label>
				<input type="text"/>
				<button>Entrar</button>
			</div>
		</div>
	);
}

export default App;
