window.onload = listarPizza

async function listarPizza() {

    let pizzas = await fetch("http://localhost:3000/api/pizza/listar");
    let lista = JSON.parse(await pizzas.text());

    try {
        for (let i = 0; i < lista.length; i++) {
            let pizza = lista[i];
            if (!pizza) {
                continue;
            }
            //Gerar HTML
            console.log(pizza)
        }
    } catch (motivoDoErro) {

        alert("Algo saiu errado" + motivoDoErro);
    }
}