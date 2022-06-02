import React, { useState } from "react";
import { excluirPizzaPedido, alterarPizzaPedido, criarPizzaPedido } from "../assets/rotasPedido";
import Item from "../models/item";
import Pizza from "../models/pizza";

interface PizzaProps {
	pizza: Pizza
	adicionavel: boolean
	removivel: boolean
	qtd?: number
	idPedido?: number
}

function CompPizza(props: PizzaProps) {
	async function addPizza(qtd: number) {
		await criarPizzaPedido(props.idPedido, props.pizza.idPizza, qtd)
		window.location.reload()
	}

	async function editPizza(qtd: number) {
		if (qtd <= 0) {
			await excluirPizzaPedido(props.idPedido, props.pizza.idPizza)
			window.location.reload()
		}
		else {
			await alterarPizzaPedido(props.idPedido, props.pizza.idPizza, qtd)
		}
	}

	function parseInputValue(id: string) {
		return parseInt((document.getElementById(id) as HTMLInputElement).value)
	}

	return (
		<div className="pizza">
			<div className="pizzaCabecalho">
				<h3>{props.pizza.nome}</h3> <span className="preco">R${props.pizza.preco.replace('.', ',')}</span>
			</div>
			<p>{props.pizza.descricao}</p>

			{props.adicionavel ? <>
				<input type="number" id="qtdAdd" defaultValue={1} min="1" />
				<button onClick={() => addPizza(parseInputValue('qtdAdd'))}>+</button>
			</> : <></>}

			{props.removivel ? <>
				<input type="number" id="qtdDelete" defaultValue={props.qtd} min="0" />
				<button onClick={() => editPizza(parseInputValue('qtdDelete'))}>Alterar</button>
			</> : <></>}

		</div>
	);
}

export default CompPizza;
