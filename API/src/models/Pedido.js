"use strict";
const app = require("teem");
class Pedido {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPedido, nomeCliente, preco from Pedido order by idPedido asc"));
        });
        return lista || [];
    }
    static async obter(idPedido) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPedido, nomeCliente, preco from Pedido where idPedido = ?", [idPedido]));
            if (lista && lista.length) {
                lista[0].carrinho = await sql.query("select idItem, idPedido, idPizza, qtd from Item where idPedido = ?", [idPedido]);
            }
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Pedido.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Pedido (nomeCliente, preco) values (?,?)", [p.nomeCliente, p.preco]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pedido ${p.idPedido} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static validar(p) {
        // throw new Error("Method not implemented.");
        return null;
    }
    static async excluir(id) {
        let erro = null;
        await app.sql.connect(async (sql) => {
            await sql.query("delete from Pedido where id = ?", [id]);
            if (!sql.affectedRows)
                erro = "Pedido não encontrada";
        });
        return erro;
    }
    static async criarPizzaNoPedido(Item) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Item (idPedido, idPizza, qtd) values (?,?,?)", [Item.idPedido, Item.idPizza, Item.qtd]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pedido já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async excluirPizzaNoPedido(Item) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("delete from Item where idPedido = ? and idPizza = ? ", [Item.idPedido, Item.idPizza]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pedido já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async alterarPizzaNoPedido(Item) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("alter table Item set qtd = ? where idPedido = ? and idPizza = ?", [Item.qtd, Item.idPedido, Item.idPizza]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pedido já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
}
module.exports = Pedido;
//# sourceMappingURL=Pedido.js.map