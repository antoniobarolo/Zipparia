import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CompPizza from "./components/compPizza";
import Navbar from "./components/navbar";
import listarPizza from "./assets/rotasPizza";
import { obterPedido } from "./assets/rotasPedido";
import Pedido from "./models/pedido";
import Pizza from "./models/pizza";

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

	let pizzas: JSX.Element[] = infospizza.map((pizza) => <CompPizza idPedido={pedido.idPedido} key={pizza.idPizza} pizza={pizza} adicionavel={true} removivel={false} />)

	let pizzascarrinho: Pizza[] = []
	let carrinho: JSX.Element[] = []
	if (pedido.carrinho.length) {
		for (let p = 0; p < pedido.carrinho.length; p++) {
			for (let i = 0; i < infospizza.length; i++) {
				if (pedido.carrinho[p].idPizza == infospizza[i].idPizza) {
					pizzascarrinho[p] = infospizza[i]
					console.log(pizzascarrinho[p].nome)
				}
			}
		}
		for (let i = 0; i < pedido.carrinho.length; i++) {
			carrinho[i] = <CompPizza key={pedido.carrinho[i].idItem} idPedido={pedido.idPedido} pizza={pizzascarrinho[i]} qtd={pedido.carrinho[i].qtd} adicionavel={false} removivel={true} />
		}
	}
	else {
		carrinho = [<p>{'nenhuma pizza no carrinho'}</p>]
	}
	//let carrinho: JSX.Element[] = pedido.carrinho.length ? pedido.carrinho.map((p) => <CompPizza key={p.idItem} pizza={pizzascarrinho[p]} qtd={p.qtd} adicionavel={false} removivel={true} />) : [<p>{'nenhuma pizza no carrinho'}</p>]

	function updateCliente() {
		if (criacao) {
			//chama funcao
			<Link to={`/editPage/${pedido.idPedido}`}>Edit</Link>
		}
		else {
			parseInt((document.getElementById('botaoNome') as HTMLInputElement).value)
		}
	}

	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input type="text" value={pedido.nomeCliente} />
				<button id='botaoNome' onClick={updateCliente}>Salvar</button>
				<div>
					<h3>Zippas no carrinho:</h3>
					{carrinho}
				</div>
			</section>
			{criacao ? <></> : <>
				<hr />
				<h2>Adicionar Zippas:</h2>
				{pizzas}
			</>}
		</>
	);
}

export default EditPage;
