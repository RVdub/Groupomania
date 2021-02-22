CREATE DATABASE  IF NOT EXISTS `groupomania`;
USE `groupomania`;

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `content` text NOT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(60) NOT NULL,
  `pseudo` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `pseudo_UNIQUE` (`pseudo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

