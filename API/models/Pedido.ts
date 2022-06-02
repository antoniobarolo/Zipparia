import app = require("teem");
import Pizza = require("./Pizza");
import Item = require("./Item");

class Pedido{
  
  public idPedido: number;
  public nomeCliente: string;
  public preco: number;
  public carrinho: Item[];

  public static async listar(): Promise<Pedido[]> {
    let lista: Pedido[] = null;
    
    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query( 
        "select idPedido, nomeCliente, preco from Pedido order by idPedido asc"
      )) as Pedido[];
    });

    return lista || [];
  }

  public static async obter(idPedido: number): Promise<Pedido> {
    let lista: Pedido[] = null
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select idPedido, nomeCliente, preco from Pedido where idPedido = ?", [idPedido])) as Pedido[];
      if (lista && lista.length) {
        lista[0].carrinho = await sql.query("select idItem, idPedido, idPizza, qtd from Item where idPedido = ?", [idPedido]) as Item[];
      }
    });
    return (lista && lista[0]) || null;
  }

  public static async criar(p: Pedido): Promise<string> {
    let erro: string;
    if((erro = Pedido.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into Pedido (nomeCliente, preco) values (?,?)", [p.nomeCliente,p.preco]);
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

  public static async criarPizzaNoPedido(Item: Item): Promise<string> {
    let erro: string;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into Item (idPedido, idPizza, qtd) values (?,?,?)", [Item.idPedido, Item.idPizza, Item.qtd]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `A Pedido já existe`;
        else throw e;
      }
    });

    return erro;
  }

  public static async excluirPizzaNoPedido(Item: Item): Promise<string> {
    let erro: string;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("delete from Item where idPedido = ? and idPizza = ? ", [Item.idPedido, Item.idPizza]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `A Pedido já existe`;
        else throw e;
      }
    });

    return erro;
  }

  public static async alterarPizzaNoPedido(Item: Item): Promise<string> {
    let erro: string;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("alter table Item set qtd = ? where idPedido = ? and idPizza = ?", [Item.qtd, Item.idPedido, Item.idPizza]);
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