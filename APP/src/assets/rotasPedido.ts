window.onload = listarPedido

async function listarPedido() {

    let pedidos = await fetch("http://localhost:3000/api/pedido/listar");
    let lista = JSON.parse(await pedidos.text());
    
    try {
        for (let i = 0; i < lista.length; i++) {
            let pedido = lista[i];
            if (!pedido) {
                continue;
            }
            //Gerar HTML
            console.log(pedido)

        }


    } catch (motivoDoErro) {

        alert("Algo saiu errado" + motivoDoErro);
    }
}

async function Criar() {


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

async function criarPizzaPedido(idPedido, idPizza) {

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

async function excluirPizzaPedido(idPedido, idPizza) {

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

async function excluir(idPedido) {

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