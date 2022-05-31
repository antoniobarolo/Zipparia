import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pizza from "./components/Pizza";
import Navbar from "./components/navbar";
import infospizza from "./models/dados";
import Item from "./models/item";

function EditPage() {
	const params = useParams()
	console.log(params)
	
	let pizzas: JSX.Element[] = []
	for (let index = 0; index < infospizza.length; index++) {
		pizzas[index] = <Pizza pizza={infospizza[index]} adicionavel={true} removivel={false} qtd={JSON.parse(params.carrinho[index]).qtd}/>	
	}

	function ObterDados(){
		//a partir do id do Pedido consulta o banco e pega o resto das infos
		//substuir no codigo onde tem "params"
	}

	function EditNome(){
		//repassa pra função EditNomeCliente dentro do componente
	}

	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input type="text" value={params.nomeCliente} />
				<button onClick={EditNome}>Definir Nome</button>
				<div>
					<h3>Zippas no carrinho:</h3>
					{params.carrinho}	
				</div>
			</section>
			<h2>Adicionar Zippas:</h2>
			{pizzas}
		</>
	);
}

export default EditPage;
