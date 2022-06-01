import Pizza from "../models/pizza";

async function listarPizza(): Promise<Pizza[]> {
    try {
        let pizzas = await fetch("http://localhost:3000/api/pizza/listar");
        return JSON.parse(await pizzas.text()) as Pizza[]
    }

    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);
    }
}

export default listarPizza