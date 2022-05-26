import React, { useState } from "react";
import { Link } from "react-router-dom";

interface AppProps {
	idpedido: number;
}

function App(props: AppProps) {
	const [cliente, setCliente] = useState("");
	const [descricao, setDescricao] = useState("");
	const [tarefas, setTarefas] = useState<Tarefa[]>([]);
	const [keyTarefa, setKeyTarefa] = useState(0);

	// O cliente, a descrição e as tarefas viriam de uma API, com base em props.idpedido
	
	function novaTarefa() {
		const tarefa: Tarefa = {
			id: 0,
			nome: "",
			tipo: 0,
			data: "",
			key: keyTarefa
		};

		setKeyTarefa(keyTarefa + 1);
		setTarefas([...tarefas, tarefa]);
	}

	function tarefaChange(novaTarefa: Tarefa) {
		setTarefas(tarefas.map(tarefa => (novaTarefa.key === tarefa.key) ? novaTarefa : tarefa));
	}

	function excluirTarefa(tarefaParaExcluir: Tarefa) {
		setTarefas(tarefas.filter(tarefa => tarefa.key !== tarefaParaExcluir.key));
	}

	return (
		<Card>
			<Card.Header>
				Pedido {props.idpedido || "Novo"}
			</Card.Header>
			<Card.Body>
				<Row>
					<Col sm="4">
						<ControleTexto label="Cliente" id="cliente" valor={cliente} onChange={setCliente} />
					</Col>

					<Col sm="8">
						<ControleTexto label="Descrição" id="descricao" valor={descricao} onChange={setDescricao} />
					</Col>
				</Row>

				<div className="text-right">
					<Button variant="primary" onClick={novaTarefa}>Nova tarefa</Button>
				</div>

				{
					(tarefas.length) ?
					tarefas.map(tarefa => <ControleTarefa
						key={tarefa.key}
						tarefa={tarefa}
						onChange={tarefaChange}
						onDelete={excluirTarefa}
					/>)
					:
					<div className="mt-3">
						Nenhuma tarefa cadastrada 😊
					</div>
				}
			</Card.Body>
		</Card>
	);
}

export default App;
