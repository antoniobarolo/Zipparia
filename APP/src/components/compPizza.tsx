import React, { useState } from "react";
import Item from "../models/item";
import Pizza from "../models/pizza";

interface PizzaProps {
	pizza: Pizza
	adicionavel: boolean
	removivel: boolean
	qtd?: number
}

function CompPizza(props: PizzaProps) {
	function addPizza(qtd: number) {
		//muda o banco, relista as pizza
	}

	function editPizza(qtd: number) {
		//muda o banco, relista as pizza
		if(qtd<=0){
		//em vez de editar apaga
		}
		//else só altera a qtd
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
				<input type="number" id="qtdDelete" defaultValue={props.qtd} min="1" />
				<button onClick={() => editPizza(parseInputValue('qtdDelete'))}>x</button>
			</> : <></>}

		</div>
	);
}

export default CompPizza;
