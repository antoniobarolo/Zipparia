import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pizza from "./components/Pizza";
import Navbar from "./components/navbar";
import _ from "./assets/rotasPedido";
import listarPizza from "./assets/rotasPizza"

async function EditPage() {
	const params = parseInt(useParams())
	let pedido = await _.obterPedido(params)

	//pizzas que estão no pedido da pessoa
	let carrinho: JSX.Element[] = []
	for (let index = 0; index < pedido.carrinho.length; index++) {
		carrinho[index] = <Pizza pizza={pedido.carrinho[index].pizza} qtd={pedido.carrinho[index].qtd} adicionavel={false} removivel={true}/>
	}

	//lista de pizzas genéricas para serem adicionadas
	let infospizza = await listarPizza()
	let pizzas: JSX.Element[] = []
	for (let index = 0; index < infospizza.length; index++) {
		pizzas[index] = <Pizza pizza={infospizza[index]} adicionavel={true} removivel={false}/>
	}

	function EditNome(){
	//repassa pra função EditNomeCliente dentro do componente
	}

	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input type="text" value={pedido.nomeCliente} />
				<button onClick={EditNome}>Definir Nome</button>
				<div>
					<h3>Zippas no carrinho:</h3>
					{carrinho}	
				</div>
			</section>
			<h2>Adicionar Zippas:</h2>
			{pizzas}
		</>
	);
}

export default EditPage;
