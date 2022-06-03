DROP SCHEMA IF EXISTS `Pizza` ;

CREATE SCHEMA IF NOT EXISTS `Pizza` DEFAULT CHARACTER SET utf8 ;
USE `Pizza` ;

DROP TABLE IF EXISTS `Pizza`.`Pedido` ;

CREATE TABLE IF NOT EXISTS `Pizza`.`Pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `nomeCliente` VARCHAR(30) NOT NULL,
  `preco` INT NOT NULL,
  PRIMARY KEY (`idPedido`)
 );

DROP TABLE IF EXISTS `Pizza`.`Pizza` ;

CREATE TABLE IF NOT EXISTS `Pizza`.`Pizza` (
  `idPizza` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idPizza`));

DROP TABLE IF EXISTS `Pizza`.`Item` ;

CREATE TABLE IF NOT EXISTS `Pizza`.`Item` (
  `idItem` INT NOT NULL AUTO_INCREMENT,
  `idPedido` INT NOT NULL,
  `idPizza` INT NOT NULL,
  `qtd` INT,
  PRIMARY KEY (`idItem`),
  INDEX `FK_idPedido_idx` (`idPedido` ASC),
  INDEX `FK_idPizza_idx` (`idPizza` ASC),
  CONSTRAINT `FK_idPedido`
    FOREIGN KEY (`idPedido`)
    REFERENCES `Pizza`.`Pedido` (`idPedido`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_idPizza`
    FOREIGN KEY (`idPizza`)
    REFERENCES `Pizza`.`Pizza` (`idPizza`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION, CONSTRAINT `unique_Pizza` unique(`idPedido`, `idPizza`));

INSERT INTO Pizza.Pedido(nomeCliente, preco)
VALUES ('Jorge da Capadócia',0);
  
INSERT INTO Pizza.Pedido(nomeCliente,preco)
VALUES('Jimmy Neutron',0);

INSERT INTO Pizza.Pedido(nomeCliente,preco)
VALUES('Sandra Punjab',0);

INSERT INTO Pizza.Pedido(nomeCliente,preco)
VALUES('Acererak Souza',0);

INSERT INTO Pizza.Pedido(nomeCliente,preco)
VALUES('Aziz ab Sobral',0);
  
INSERT INTO Pizza.Pizza(nome,descricao,preco)
VALUES ('Pizza ruim','Ela é muito boaaa',10);
  
INSERT INTO Pizza.Pizza(nome,descricao,preco)
VALUES('Zippa de .zip','Sabor comprimido',18);

INSERT INTO Pizza.Pizza(nome,descricao,preco)
VALUES('Zippa de PEDRA','Sabor indescritível, nada perdoa',20);

INSERT INTO Pizza.Pizza(nome,descricao,preco)
VALUES('Zippa de Amor','Não existe amor em SP, mas na ZP existe',8);

INSERT INTO Pizza.Pizza(nome,descricao,preco)
VALUES('Zippa do Gaspar','Girempoca da parafuseta',15);

INSERT INTO Pizza.Pizza(nome,descricao,preco)
VALUES('Zippa do Baloiro','É a pizza do leonardo',10);
  
INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (1,1,3);

INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (1,2,2);

INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (2,1,4);

INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (2,2,1);

INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (2,3,1);

INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (3,2,1);

INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (3,4,1);

INSERT INTO Pizza.Item(idPedido,idPizza,qtd)
VALUES (5,3,5);