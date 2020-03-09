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


-- / Creación de las tablas que tienen FK
CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) NULL DEFAULT 'no-image.png',
  `user_id` int(10) unsigned DEFAULT NULL,
  `colors_id` int(10) unsigned DEFAULT NULL,
  `brand_id` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`colors_id`) REFERENCES `colors`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
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

CREATE TABLE `colors_product` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_id` int(10) unsigned DEFAULT NULL,
  `colors_id` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  FOREIGN KEY (`colors_id`) REFERENCES `colors` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- / Populando las tablas
INSERT INTO `brands` VALUES 
	(DEFAULT, 'Mimo', NULL, NULL),
	(DEFAULT, 'Zuppa', NULL, NULL),
	(DEFAULT, 'Owoko', NULL, NULL),
	(DEFAULT, 'Gepetto', NULL, NULL);
	

INSERT INTO `categories` VALUES 
	(DEFAULT, 'nenas', NULL, NULL),
	(DEFAULT, 'nenes', NULL, NULL),
	(DEFAULT, 'bbNene', NULL, NULL),
	(DEFAULT, 'bbNena', NULL, NULL);


INSERT INTO `colors` VALUES 
	(DEFAULT, 'yellow', NULL, NULL),
	(DEFAULT, 'blue', NULL, NULL),
	(DEFAULT, 'red', NULL, NULL),
	(DEFAULT, 'white', NULL, NULL),
	(DEFAULT, 'black', NULL, NULL);

INSERT INTO `users` VALUES 
	(DEFAULT, 'Jon', 'Doe', 'jondoe@email.com', '123abc', NULL, NULL),
	(DEFAULT, 'Jane', 'Doe', 'janedoe@email.com', '123abc', NULL, NULL),
	(DEFAULT, 'Jon', 'Snow', 'jonsnow@email.com', '123abc', NULL, NULL);
	