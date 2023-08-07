/*Deixando campos NOT Null na tabela usuario*/

ALTER TABLE `usuario` CHANGE `email` `email` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;
ALTER TABLE `usuario` CHANGE `nome` `nome` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;
ALTER TABLE `usuario` CHANGE `senha` `senha` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;

/*Deixando campos NOT Null na tabela admnistrador*/


ALTER TABLE `administrador` CHANGE `email` `email` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;
ALTER TABLE `administrador` CHANGE `nome` `nome` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;
ALTER TABLE `administrador` CHANGE `senha` `senha` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;

/*Deixando campo Unico na tabela usuario*/

ALTER TABLE `usuario` ADD UNIQUE(`email`);

/*Deixando campo Unico na tabela administrador*/

ALTER TABLE `administrador` ADD UNIQUE(`email`);
