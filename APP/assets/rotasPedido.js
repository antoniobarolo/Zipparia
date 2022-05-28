listar()

async function listar() {
    
    let pedidos = await fetch("http://localhost:3000/api/pedido/listar");
    console.log(pedidos)
}