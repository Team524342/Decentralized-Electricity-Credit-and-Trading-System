-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: decentralized_energy_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(225) NOT NULL,
  `role` enum('producer','consumer','admin') NOT NULL,
  `wallet_address` varchar(225) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Feroz','feroz@gmail.com','pbkdf2_sha256$1000000$EXjcdcEfiYU3aRQKLxT8aG$+wC+g48L2HJHCwTvNIhi9Eli46AYUsWZdeYem6SaC6U=','consumer','abcd','wnp','2025-10-25 08:07:11'),(2,'ali','ali@gmail.com','pbkdf2_sha256$1000000$rtL117WpqLKzY0AULvMe5d$PvIL+o95nrEeFTc1f2NAqJXyr98o3OW7E2WkEJRzVDM=','admin','abcde','isl','2025-10-25 08:08:33'),(3,'ghani','ghani@gmail.com','pbkdf2_sha256$1000000$C5Z4Bofvq2FMDRxzknqJvN$ZJcTPMAJ3RcWJMfpASO/fXzoxbl4gxGxIoGQhA1teN8=','producer','abcdef','kishan bagh','2025-10-25 09:25:25'),(4,'baba','bab@gmail.com','pbkdf2_sha256$1000000$Dw8j0HW8FA8uMxDH0vudt1$o2OB5prTOYhyzr89ketEqY8zIwAJO2L8/3AJm9rxRyA=','consumer','abcdef','lingampally','2025-10-25 09:44:11'),(5,'ozair','ozair@gmail.com','pbkdf2_sha256$1000000$1jilRhYG6YNMYognIIDYls$dUFeyKAbUq8CoI39++86wTRuVtwE3HEAO4p9ksLcVsA=','consumer','abcdef','yakutpura','2025-10-25 09:54:15'),(6,'Fardeen','Fardeen@gmail.com','pbkdf2_sha256$1000000$feFuhkX7mrHG4kJD3aqiBc$gtDIODzd0+VVqODCPxZvUmWjlEHmnSMuVR5zDwE1NtM=','consumer','abcdef','yakutpura','2025-10-27 12:38:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-28 19:12:51
