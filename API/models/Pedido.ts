import app = require("teem");
import Pizza = require("./Pizza");

class Pedido{
  
  public idPedido: number;
  public idCliente: number;
  public Preco: number;
 
  public static async listar(): Promise<Pedido[]> {
    let lista: Pedido[] = null;
    
    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query( 
        "select idPedido, idCliente, Preco from Pedido order by idPedido asc"
      )) as Pedido[];
    });

    return lista || [];
  }

  public static async obterPizzasDoPedido(idPedido: number): Promise<Pizza[]> {
    let lista: Pizza[] = null;
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select p.idPizza, p.Nome, p.Descricao, p.Preco from Rel_Pizza_Pedido r INNER JOIN Pizza p on r.idPizza = p.idPizza where r.idPedido = ?", [idPedido])) as Pizza[];
    });

    return (lista) || null;
  }

  public static async obter(id: number): Promise<Pedido> {
    let lista: Pedido[] = null;
    
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select p.idPedido, p.idCliente, p.Preco from Pedido p INNER JOIN Cliente c on p.idCliente = c.idCliente where idCliente = ?", [id,])) as Pedido[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Pedido): Promise<string> {
    let erro: string;
    if((erro = Pedido.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into Pedido (idCliente, Preco) values (?,?)", [p.idCliente,p.Preco]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `A Pedido ${p.idPedido} já existe`;
        else throw e;
      }
    });

    return erro;
  }
  static validar(p: Pedido): string {
   // throw new Error("Method not implemented.");
    return null;
  }

  public static async excluir(id: number): Promise<string> {
    let erro: string = null;

    await app.sql.connect(async (sql: app.Sql) => {
      await sql.query("delete from Pedido where id = ?", [id]);
      if (!sql.affectedRows) erro = "Pedido não encontrada";
    });

    return erro;
  }
}

export = Pedido;