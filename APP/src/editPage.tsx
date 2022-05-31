import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pizza from "./components/Pizza";
import Navbar from "./components/navbar";
import infospizza from "./models/dados";

function EditPage() {
	const params = useParams()
	console.log(params)
	
	let pizzas: JSX.Element[] = []
	for (let index = 0; index < infospizza.length; index++) {
		pizzas[index] = <Pizza pizza={infospizza[index]} adicionavel={true} removivel={false}/>	
	}

	function EditPedido(){
		//atualizar a API e redirecionar p pagina de pedidos
	}
	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input type="text" value={params.nomeCliente} />
				<div>
					<h3>Zippas no carrinho:</h3>
					{params.carrinho}	
				</div>
				<button onClick={EditPedido}>Atualizar</button>
			</section>
			<h2>Adicionar Zippas:</h2>
			{pizzas}
		</>
	);
}

export default EditPage;
