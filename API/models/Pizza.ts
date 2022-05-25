import app = require("teem");

class Pizza{
  
  public idPizza: number;
  public Nome: string;
  public Descricao: string;
  public Preco: number;
 
  public static async listar(): Promise<Pizza[]> {
    let lista: Pizza[] = null;
    
    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query( 
        "select idPizza, Nome, Descricao, Preco from Pizza order by nome asc"
      )) as Pizza[];
    });

    return lista || [];
  }

  public static async obter(id: number): Promise<Pizza> {
    let lista: Pizza[] = null;
    
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select idPizza, Nome, Descricao, Preco from Pizza where id = ?", [id,])) as Pizza[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Pizza): Promise<string> {
    let erro: string;
    if((erro = Pizza.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into Pizza (Nome, Descricao, Preco) values (?,?)", [p.Nome,p.Preco]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `A Pizza ${p.Nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }
  static validar(p: Pizza): string {
   // throw new Error("Method not implemented.");
    return null;
  }

  public static async alterar(p: Pizza): Promise<string> {
    let erro: string;
    if ((erro = Pizza.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("update Pizza set Nome = ?,set Descricao = ?, set Preco = ?", [
          p.Nome,
          p.Descricao,
          p.Preco,
        ]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
        erro = `A Pizza ${p.Nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }

  public static async excluir(id: number): Promise<string> {
    let erro: string = null;

    await app.sql.connect(async (sql: app.Sql) => {
      await sql.query("delete from Pizza where id = ?", [id]);
      if (!sql.affectedRows) erro = "Pizza não encontrada";
    });

    return erro;
  }
}

export = Pizza;