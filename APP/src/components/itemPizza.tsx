import React, { useState } from "react";
import Pizza from "../models/pizza";

interface ItemPizzaProps {
	pizza: Pizza;
}

function ItemSecao(props: ItemPizzaProps) {
	return (
		<div>
			<div className="pizzaCabecalho">
				<h3>{props.pizza.nome}</h3> <span className="preco">{props.pizza.preco}</span>
			</div>
			<p>{props.pizza.descricao}</p>
			<button onClick={()=>"addPizza()"}>+</button>
			<button onClick={()=>"deletePizza()"}>x</button>
		</div>
	);
}

export default ItemSecao;
