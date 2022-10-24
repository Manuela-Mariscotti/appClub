-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: appclubs
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubs` (
  `id_club` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(45) DEFAULT NULL,
  `budget` int DEFAULT NULL,
  PRIMARY KEY (`id_club`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (1,'Club Atético Boca Juniors',200000),(2,'Club Atlético River Plate',300000),(3,'Club Atlético San Lorenzo de Almagro',100000),(4,'Racing Club',5000);
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coachs`
--

DROP TABLE IF EXISTS `coachs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coachs` (
  `id_coach` int NOT NULL AUTO_INCREMENT,
  `coach_f_name` varchar(45) DEFAULT NULL,
  `coach_l_name` varchar(45) DEFAULT NULL,
  `coach_salary` int DEFAULT NULL,
  `coach_email` varchar(45) DEFAULT NULL,
  `id_club` int DEFAULT NULL,
  PRIMARY KEY (`id_coach`),
  KEY `fk_id_club_coachs_idx` (`id_club`),
  CONSTRAINT `fk_id_club_coachs` FOREIGN KEY (`id_club`) REFERENCES `clubs` (`id_club`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coachs`
--

LOCK TABLES `coachs` WRITE;
/*!40000 ALTER TABLE `coachs` DISABLE KEYS */;
INSERT INTO `coachs` VALUES (1,'Marcelo','Campos',2000,'marcelo@gmail.com',1),(2,'Juanjo','Llanos',2000,'juanjo@hotmail.com',1),(3,'Carlos','Herrera',3000,'carlos67@gmail.com',1),(4,'Nicolas','Ballesteros',2000,'nico@gmail.com',1),(5,'Ernesto','Casas',3000,'ercasas@hotmail.com',1),(6,'Julio','Castillos',2000,'julica@yahoo.com',1),(7,'Estenam','Quito',2000,'esteban@hotmail.com',1),(8,'Carlos','Tenembaum',4000,'carten@gmail.com',3),(9,'Miguel','Beccar',3000,'miguebe@yahoo.com',3),(10,'Atilio','Borón',3000,'atiboro@gmail.com',3),(11,'Juanjo','Ibañez',3000,'juaniban@hotmail.com',2),(12,'Juan','Castro',3600,'juanca@yahoo.com',2),(13,'Martin','Ambos',3000,'ambosmar@gmail.com',2);
/*!40000 ALTER TABLE `coachs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id_player` int NOT NULL AUTO_INCREMENT,
  `player_f_name` varchar(45) DEFAULT NULL,
  `player_l_name` varchar(45) DEFAULT NULL,
  `player_salary` int DEFAULT NULL,
  `player_email` varchar(45) DEFAULT NULL,
  `id_club` int DEFAULT NULL,
  PRIMARY KEY (`id_player`),
  KEY `fk_id_club_players_idx` (`id_club`),
  CONSTRAINT `fk_id_club_players` FOREIGN KEY (`id_club`) REFERENCES `clubs` (`id_club`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Juan','Lopez',2000,'juan94@gmail.com',1),(2,'Alfredo','Mesa',1000,'almesa@hotmail.com.mx',1),(3,'Carlos','Estevez',3000,'carlos@aol.com',NULL),(4,'Jesus','López',3000,'jesus@msnl.com',NULL),(5,'Cristian','Castro',2500,'cris@gmail.com',1),(6,'Alejo','Sauras',2500,'alejo@hotmail.com',1),(7,'Alejandro','Estevanez',3000,'alejandro@yahoo.com',2),(8,'Edmundo','Cruz',2000,'edcruz@gmail.com',2),(9,'Washington','Rodriguez',2000,'wasro@hotmail.com',1),(10,'Quique','Sauras',4000,'quiquesauras@gmail.com',2),(11,'Rafael','Correa',3000,'rafaco@yahoo.com',2),(12,'Federico','Vazquez',2000,'fedeva@hotmail.com',2),(13,'Marias','Rosujoski',3000,'matirosu@gmail.com',NULL),(14,'Gabriel','Pichot',4000,'gabipichot@yahoo.com',3),(15,'Alberto','Fernandez',2000,'capitanbeto@hotmail.com',3),(16,'Teodoro','Capuchetti',3000,'teocapo@gmail.com',3),(17,'Cristiano','Rolando',1500,'cristorolo@hotmail.com',NULL),(18,'Lucas','Roman',3000,'lucasroman@gmail.com',3),(19,'Chechu','Martinez',2500,'chema@gmail.com',NULL),(20,'Leo','Narvona',3000,'leonarvona@gmail.com',NULL);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-24 17:40:32
