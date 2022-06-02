DROP SCHEMA IF EXISTS `Pizza` ;

CREATE SCHEMA IF NOT EXISTS `Pizza` DEFAULT CHARACTER SET utf8 ;
USE `Pizza` ;

DROP TABLE IF EXISTS `Pizza`.`Pedido` ;

CREATE TABLE IF NOT EXISTS `Pizza`.`Pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `NomeCliente` VARCHAR(30) NOT NULL,
  `Preco` INT NOT NULL,
  PRIMARY KEY (`idPedido`)
 );

DROP TABLE IF EXISTS `Pizza`.`Pizza` ;

CREATE TABLE IF NOT EXISTS `Pizza`.`Pizza` (
  `idPizza` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Descricao` VARCHAR(45) NOT NULL,
  `Preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idPizza`));

DROP TABLE IF EXISTS `Pizza`.`Rel_Pizza_Pedido` ;

CREATE TABLE IF NOT EXISTS `Pizza`.`Rel_Pizza_Pedido` (
  `idRel_Pizza_Pedido` INT NOT NULL AUTO_INCREMENT,
  `idPedido` INT NOT NULL,
  `idPizza` INT NOT NULL,
  `Quantidade` INT,
  PRIMARY KEY (`idRel_Pizza_Pedido`),
  INDEX `FK_idPedido_idx` (`idPedido` ASC),
  INDEX `FK_idPizza_idx` (`idPizza` ASC),
  CONSTRAINT `FK_idPedido`
    FOREIGN KEY (`idPedido`)
    REFERENCES `Pizza`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_idPizza`
    FOREIGN KEY (`idPizza`)
    REFERENCES `Pizza`.`Pizza` (`idPizza`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--A partir daqui é população

INSERT INTO Pizza.Pedido(NomeCliente, Preco)
VALUES('Jorge da Capadócia',0);
  
INSERT INTO Pizza.Pedido(NomeCliente,Preco)
VALUES('Jimmy Neutron',0);
  
INSERT INTO Pizza.Pizza(
Nome,
Descricao,
Preco) VALUES(
'Pizza ruim',
'Ela é muito boaaa',
    10
  );
  
INSERT INTO Pizza.Pizza(
Nome,
Descricao,
Preco) VALUES(
  'Zippa de .zip',
	'Sabor comprimido',
    18
  );
  
INSERT INTO Pizza.Rel_Pizza_Pedido(
idPedido,
idPizza,
Quantidade)
	VALUES(1,1,3);
    
INSERT INTO Pizza.Rel_Pizza_Pedido(
idPedido,
idPizza,
Quantidade)
	VALUES(2,1,4);
    
INSERT INTO Pizza.Rel_Pizza_Pedido(
idPedido,
idPizza,
Quantidade)
	VALUES(2,2,1)