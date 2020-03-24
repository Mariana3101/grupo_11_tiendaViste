-- / Creación de la DB
CREATE DATABASE tiendaViste_db;
USE tiendaViste_db;


-- / Creación de las tablas que NO tienen FK
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NULL DEFAULT 'no-image.png',
  `role` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `brands` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `colors` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE  `sizes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- / Creación de las tablas que tienen FK
CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) NULL DEFAULT 'no-image.png',
 
  `colors_id` int(10) unsigned DEFAULT NULL,
  `size_id` int(10) unsigned DEFAULT NULL,
  `brand_id` int(10) unsigned DEFAULT NULL,
  `category_id` int (10) unsigned DEFAULT null,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`colors_id`) REFERENCES `colors`(`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN key (`size_id`) REFERENCES `sizes` (`id`), 
  FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `category_product` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_id` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- /  Completando tablas
INSERT INTO `products` VALUES
(DEFAULT, 'Remera', 500, 'remera.png',1,1,1,1, null,null );


INSERT INTO `brands` VALUES 
	(DEFAULT, 'Meow', NULL, NULL),
	(DEFAULT, 'Facheritos', NULL, NULL),
	(DEFAULT, 'Cheeky', NULL, NULL),
	(DEFAULT, 'Litle Akiabara', NULL, NULL),
	(DEFAULT, 'Grisino', NULL, NULL);

INSERT INTO `categories` VALUES 
	(DEFAULT, 'Bebe-niña', NULL, NULL),
	(DEFAULT, 'Bebe-niño', NULL, NULL),
	(DEFAULT, 'Niña', NULL, NULL),
	(DEFAULT, 'Niño', NULL, NULL);
	
INSERT INTO `sizes` VALUES 
	(DEFAULT, 'S', NULL, NULL),
	(DEFAULT, 'M', NULL, NULL),
	(DEFAULT, 'L', NULL, NULL),
	(DEFAULT, 'XL', NULL, NULL);
	
INSERT INTO `colors` VALUES 
	(DEFAULT, 'yellow', NULL, NULL),
	(DEFAULT, 'blue', NULL, NULL),
	(DEFAULT, 'red', NULL, NULL),
	(DEFAULT, 'white', NULL, NULL),
	(DEFAULT, 'black', NULL, NULL);

INSERT INTO `users` VALUES 
	(DEFAULT, 'Maria', 'Perez', 'maria@email.com', '123abc', NULL, admin, NULL),
	(DEFAULT, 'Jose', 'Diaz', 'jose@email.com', '123abc', NULL, NULL),
	(DEFAULT, 'Juan', 'Suarez', 'juan@email.com', '123abc', NULL, NULL);