import React, { useState } from "react";
import Item from "../models/item";
import Pizza from "../models/pizza";

interface PizzaProps {
	pizza: Pizza
	adicionavel: boolean
	removivel: boolean
	qtd? : number
}

function Pizza(props: PizzaProps) {
	function addPizza(qtd: number) {
		//muda o banco, relista as pizza
	}

	function deletePizza(qtd: number) {
		//muda o banco, relista as pizza
	}

	return (
		<div className="pizza">
			<div className="pizzaCabecalho">
				<h3>{props.pizza.nome}</h3> <span className="preco">R${props.pizza.preco}0</span>
			</div>
			<p>{props.pizza.descricao}</p>

			{props.adicionavel ? <><button onClick={() => addPizza(1)}>+</button>
				<input type="number" id="qtdAdd" defaultValue={1} min="1" /></> : <></>}

			{props.removivel ? <><button onClick={() => deletePizza(1)}>x</button>
				<input type="number" id="qtdDelete" defaultValue={props.qtd} min="1" max={props.qtd}/></> : <></>}

		</div>
	);
}

export default Pizza;
