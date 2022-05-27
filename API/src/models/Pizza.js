"use strict";
const app = require("teem");
class Pizza {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPizza, Nome, Descricao, Preco from Pizza order by nome asc"));
        });
        return lista || [];
    }
    static async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPizza, Nome, Descricao, Preco from Pizza where idPizza = ?", [id]));
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Pizza.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Pizza (Nome, Descricao, Preco) values (?,?,?)", [p.Nome, p.Descricao, p.Preco]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pizza ${p.Nome} já existe`;
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
    static async alterar(p) {
        let erro;
        if ((erro = Pizza.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update Pizza set Nome = ?,set Descricao = ?, set Preco = ?", [
                    p.Nome,
                    p.Descricao,
                    p.Preco,
                ]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `A Pizza ${p.Nome} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async excluir(id) {
        let erro = null;
        await app.sql.connect(async (sql) => {
            await sql.query("delete from Pizza where idPizza = ?", [id]);
            if (!sql.affectedRows)
                erro = "Pizza não encontrada";
        });
        return erro;
    }
}
module.exports = Pizza;
//# sourceMappingURL=Pizza.js.map