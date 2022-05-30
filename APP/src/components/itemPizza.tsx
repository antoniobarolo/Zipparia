import React, { useState } from "react";
import Pizza from "../models/pizza";

interface ItemPizzaProps {
	pizza: Pizza;
	adicionavel: boolean;
	removivel: boolean;
}

function ItemPizza(props: ItemPizzaProps) {
	function addPizza() {

	}

	function deletePizza() {

	}

	return (
		<div className="itemPizza">
			<div className="pizzaCabecalho">
				<h3>{props.pizza.nome}</h3> <span className="preco">R${props.pizza.preco}0</span>
			</div>
			<p>{props.pizza.descricao}</p>
			{props.adicionavel ? <button onClick={addPizza}>+</button> : <></>}
			{props.removivel ? <button onClick={deletePizza}>x</button> : <></>}

		</div>
	);
}

export default ItemPizza;
