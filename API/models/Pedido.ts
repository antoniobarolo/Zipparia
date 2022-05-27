import app = require("teem");
import Pizza = require("./Pizza");

class Pedido{
  
  public idPedido: number;
  public NomeCliente: string;
  public Preco: number;
  public Pizza: Pizza[];
  public static async listar(): Promise<Pedido[]> {
    let lista: Pedido[] = null;
    
    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query( 
        "select idPedido, NomeCliente, Preco from Pedido order by idPedido asc"
      )) as Pedido[];
    });

    return lista || [];
  }

  public static async obter(idPedido: number): Promise<Pedido[]> {
    let lista: Pedido[] = null;
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select pe.NomeCliente, p.idPizza, p.Nome, p.Descricao, p.Preco from Rel_Pizza_Pedido r INNER JOIN Pizza p on r.idPizza = p.idPizza INNER JOIN Pedido pe on r.idPedido = pe.idPedido where r.idPedido = ?", [idPedido])) as Pedido[];
    });

    return (lista) || null;
  }

  public static async criar(p: Pedido): Promise<string> {
    let erro: string;
    if((erro = Pedido.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into Pedido (NomeCliente, Preco) values (?,?)", [p.NomeCliente,p.Preco]);
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

  public static async criarPizzaNoPedido(idPedido: number,idPizza: number): Promise<string> {
    let erro: string;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into Rel_Pizza_Pedido (idPedido, idPizza) values (?,?)", [idPedido, idPizza]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `A Pedido já existe`;
        else throw e;
      }
    });

    return erro;
  }
}

export = Pedido;