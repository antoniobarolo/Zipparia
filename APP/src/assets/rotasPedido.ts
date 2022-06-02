import Pedido from "../models/pedido";

export async function listarPedido(): Promise<Pedido[]> {
    try {
        let pedidos = await fetch("http://localhost:3000/api/pedido/listar");
        return await pedidos.json() as Pedido[]

    } catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);
    }
}

export async function obterPedido(id: number): Promise<Pedido> {
    try {
        let pedidos = await fetch(`http://localhost:3000/api/pedido/obter/${id}`);
        return await pedidos.json() as Pedido;
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);
    }
}

export async function Criar() {
    try {
        const formData = new FormData(document.querySelector('form'))
        var pedido = {};
        formData.forEach((value, key) => pedido[key] = value);
        console.log(JSON.stringify(pedido))

        let resposta = await fetch("https://academico.espm.br/api/pedido/criar", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(pedido),
        });

        if (await resposta.ok) {
            listarPedido();
            alert("Deu Certo")
        }

    } catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }

}

export async function criarPizzaPedido(idPedido, idPizza) {

    try {
        console.log('id pedido:' + idPedido + ', id pizza:' + idPizza)
        let resposta = await fetch(`https://academico.espm.br/api/pedido/criarPizzaNoPedido/${idPedido}/${idPizza}`);
        if (await resposta.ok) {

            listarPedido()
            alert("Deu Certo")
        }
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }
}

export async function excluirPizzaPedido(idPedido, idPizza) {

    try {
        console.log('id pedido:' + idPedido + ', id pizza:' + idPizza)
        let resposta = await fetch(`https://academico.espm.br/api/pedido/excluirPizzaNoPedido/${idPedido}/${idPizza}`);
        if (await resposta.ok) {

            listarPedido()
            alert("Deu Certo")
        }
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }
}

export async function excluir(idPedido) {

    try {
        console.log('id pedido:' + idPedido)
        let resposta = await fetch(`https://academico.espm.br/api/pedido/excluir/${idPedido}`);
        if (await resposta.ok) {

            listarPedido()
            alert("Deu Certo")
        }
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }
}
