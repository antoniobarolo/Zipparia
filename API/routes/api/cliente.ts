import app = require("teem");
import Cliente = require("../../models/Cliente");

class ClienteApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Cliente.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:nome")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let nome = req.params["nome"];

      let cliente: Cliente = null;

      if (!nome) {
          erro = "Nome inválido";
      } else {
          cliente = await Cliente.obter(nome);

          if (!cliente) {
              erro = "Cliente não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(cliente);
      }
  }

  @app.http.post()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let cliente = req.body as Cliente;

      erro = await Cliente.criar(cliente);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.route.methodName("/excluir/:id")
  public async excluir(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      if(isNaN(id)){
          erro = "Id inválido";
      } else{
          erro = await Cliente.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = ClienteApiRoute;