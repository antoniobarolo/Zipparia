import app = require("teem");

class Cliente{
  
  public idCliente: number;
  public Nome: string;
 
  public static async listar(): Promise<Cliente[]> {
    let lista: Cliente[] = null;
    
    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query( 
        "select idCliente, Nome from Cliente order by idCliente asc"
      )) as Cliente[];
    });

    return lista || [];
  }

  public static async obter(nome: string): Promise<Cliente> {
    let lista: Cliente[] = null;
    
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select idCliente, Nome from Cliente where Nome = ?", [nome,])) as Cliente[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Cliente): Promise<string> {
    let erro: string;
    if((erro = Cliente.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into Cliente (Nome) values (?)", [p.Nome]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `O Cliente ${p.Nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }
  static validar(p: Cliente): string {
   // throw new Error("Method not implemented.");
    return null;
  }

  public static async excluir(id: number): Promise<string> {
    let erro: string = null;

    await app.sql.connect(async (sql: app.Sql) => {
      await sql.query("delete from Cliente where id = ?", [id]);
      if (!sql.affectedRows) erro = "Cliente não encontrada";
    });

    return erro;
  }
}

export = Cliente;