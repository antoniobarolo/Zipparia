"use strict";
const app = require("teem");
class Pedido {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPedido, idCliente, Preco from Pedido order by idPedido asc"));
        });
        return lista || [];
    }
    static async obterPizzasDoPedido(idPedido) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select p.idPizza, p.Nome, p.Descricao, p.Preco from Rel_Pizza_Pedido r INNER JOIN Pizza p on r.idPizza = p.idPizza where r.idPedido = ?", [idPedido]));
        });
        return (lista) || null;
    }
    static async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select p.idPedido, p.idCliente, p.Preco from Pedido p INNER JOIN Cliente c on p.idCliente = c.idCliente where idCliente = ?", [id,]));
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Pedido.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Pedido (idCliente, Preco) values (?,?)", [p.idCliente, p.Preco]);
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
}
module.exports = Pedido;
//# sourceMappingURL=Pedido.js.map