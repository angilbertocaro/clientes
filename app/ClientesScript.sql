CREATE DATABASE DBClientes
;

USE DBClientes
;

CREATE TABLE `clientes`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) UNSIGNED NOT NULL,
  `id_direccion` int(11) UNSIGNED NOT NULL,
  `comentarios` varchar(5000) NULL,
  `estatus` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `direcciones`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `calle` varchar(50) NOT NULL,
  `numero` varchar(15) NOT NULL,
  `colonia` varchar(50) NOT NULL,
  `codigo_postal` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `documentos`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `archivo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `personas`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `primer_apellido` varchar(50) NOT NULL,
  `segundo_apellido` varchar(50) NULL,
  `telefono` varchar(15) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  PRIMARY KEY (`id`)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `clientes` ADD CONSTRAINT `fk_clientes_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id`);
ALTER TABLE `clientes` ADD CONSTRAINT `fk_clientes_direcciones` FOREIGN KEY (`id_direccion`) REFERENCES `direcciones` (`id`);
ALTER TABLE `documentos` ADD CONSTRAINT `fk_documentos_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);

