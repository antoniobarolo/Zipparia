import app = require("teem");
import Pedido = require("../../models/Pedido");
import Pizza = require("../../models/Pizza");

class PedidoApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Pedido.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let pedido: Pedido = null;

      if (!id) {
          erro = "ID inválido";
      } else {
          pedido = await Pedido.obter(id);

          if (!pedido) {
              erro = "Pedido não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(pedido);
      }
  }

  @app.route.methodName("/obterPizzasDoPedido/:id")
  public async obterPizzasDoPedido(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let pizzas: Pizza[] ;

      if (!id) {
          erro = "ID inválido";
      } else {
          pizzas = await Pedido.obterPizzasDoPedido(id);

          if (!pizzas) {
              erro = "Pedido não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(pizzas);
      }
  }

  @app.http.post()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pedido = req.body as Pedido;

      erro = await Pedido.criar(pedido);

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
          erro = await Pedido.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = PedidoApiRoute;