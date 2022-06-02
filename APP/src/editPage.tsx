import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CompPizza from "./components/compPizza";
import Navbar from "./components/navbar";
import listarPizza from "./assets/rotasPizza";
import { obterPedido } from "./assets/rotasPedido";
import Pedido from "./models/pedido";
import Pizza from "./models/pizza";
import Item from "./models/item";

function EditPage() {
	const params = useParams();
	const criacao = (params.idPedido == 'create')

	const [atualizando, setAtualizando] = useState(false)
	const [infospizza, setInfospizza] = useState<Pizza[]>(null)
	const [pedido, setPedido] = useState<Pedido>(null)

	async function getPedidoPizza() {
		setAtualizando(true);
		setInfospizza(await listarPizza() || []);
		setPedido(await obterPedido(parseInt(params.idPedido)));
		setAtualizando(false);
	}

	useEffect(() => {
		if (!atualizando && (!pedido || !infospizza)) {
			getPedidoPizza();
		}
	});

	if (!pedido || !infospizza) {
		return <> <Navbar /> Carregando...</>;
	}

	let carrinho: JSX.Element[] = pedido.carrinho.length? pedido.carrinho.map((p) => <CompPizza key={p.idItem} pizza={infospizza[p.idpizza]} qtd={p.qtd} adicionavel={false} removivel={true} />) : [<p>{'nenhuma pizza no carrinho'}</p>]

	let pizzas: JSX.Element[] = infospizza.map((pizza) => <CompPizza key={pizza.idPizza} pizza={pizza} adicionavel={true} removivel={false} />)

	function editNome() {
		//repassa pra função EditNomeCliente dentro do componente
	}

	function createPedido(){

	}

	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input type="text" value={pedido.nomeCliente} />
				<button onClick={criacao? createPedido : editNome}>Salvar</button>
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
