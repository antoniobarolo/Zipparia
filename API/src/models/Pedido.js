"use strict";
const app = require("teem");
class Pedido {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPedido, NomeCliente, Preco from Pedido order by idPedido asc"));
        });
        return lista || [];
    }
    static async obter(idPedido) {
        let pedido = null;
        await app.sql.connect(async (sql) => {
            const lista = (await sql.query("select idPedido, NomeCliente, Preco from Pedido where idPedido = ?", [idPedido]));
            if (lista && lista.length) {
                lista[0].Pizza = await sql.query("select idRel_Pizza_Pedido, idPedido, idPizza, Quantidade from Rel_Pizza_Pedido where idPedido = ?", [idPedido]);
            }
        });
        return pedido;
    }
    static async criar(p) {
        let erro;
        if ((erro = Pedido.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Pedido (NomeCliente, Preco) values (?,?)", [p.NomeCliente, p.Preco]);
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
    static async criarPizzaNoPedido(Rel_Pizza_Pedido) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Rel_Pizza_Pedido (idPedido, idPizza, Quantidade) values (?,?,?)", [Rel_Pizza_Pedido.idPedido, Rel_Pizza_Pedido.idPizza, Rel_Pizza_Pedido.Quantidade]);
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
    static async excluirPizzaNoPedido(Rel_Pizza_Pedido) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("delete from Rel_Pizza_Pedido where idPedido = ? and idPizza = ? ", [Rel_Pizza_Pedido.idPedido, Rel_Pizza_Pedido.idPizza]);
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
    static async alterarPizzaNoPedido(Rel_Pizza_Pedido) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("alter table Rel_Pizza_Pedido set quantidade = ? where idPedido = ? and idPizza = ?", [Rel_Pizza_Pedido.Quantidade, Rel_Pizza_Pedido.idPedido, Rel_Pizza_Pedido.idPizza]);
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