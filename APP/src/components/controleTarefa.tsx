import React from "react";

interface ControleTarefaProps {
	tarefa: Tarefa,
	onChange?: (novaTarefa: Tarefa) => void,
	onDelete?: (tarefa: Tarefa) => void
}

function ControleTarefa(props: ControleTarefaProps) {

	function nomeChange(novoNome: string) {
		if (props.onChange)
			props.onChange({ ...props.tarefa, nome: novoNome });
	}

	function tipoChange(e: any) {
		if (props.onChange)
			props.onChange({ ...props.tarefa, tipo: parseInt(e.target.value) });
	}

	function dataChange(novaData: string) {
		if (props.onChange)
			props.onChange({ ...props.tarefa, data: novaData });
	}

	function excluirTarefa() {
		if (props.onDelete)
			props.onDelete(props.tarefa);
	}

	return (
		<>
			{/*
				Como apenas um elemento deve ser retornado, mas temos que retornar vários,
				precisamos encapsular os elementos dentro de um único elemento.

				Para não criarmos um elemento desnecessário, como um div, o React fornece
				um "elemento vazio", representado por <>, que é um elemento puramente virtual,
				ou seja, ele não cria um elemento real no HTML.
			*/}
			<hr/>
			<Button className="mb-3" variant="danger" onClick={excluirTarefa}>
				Excluir
			</Button>
			<Row>
				<Col sm="4">
					<ControleTexto label="Nome" id={"nome" + props.tarefa.key} valor={props.tarefa.nome} onChange={nomeChange} />
				</Col>

				<Col sm="4">
					<Form.Group className="mb-3" controlId={"tipo" + props.tarefa.key}>
						<Form.Label>Tipo</Form.Label>
						<Form.Select value={props.tarefa.tipo} onChange={tipoChange}>
							<option value="">Selecione...</option>
							<option value="1">Tipo 1</option>
							<option value="2">Tipo 2</option>
							<option value="3">Tipo 3</option>
						</Form.Select>
					</Form.Group>
				</Col>

				<Col sm="4">
					<ControleTexto label="Data" tipo="date" id={"data" + props.tarefa.key} valor={props.tarefa.data} onChange={dataChange} />
				</Col>
			</Row>
		</>
	);
}

export default ControleTarefa;
