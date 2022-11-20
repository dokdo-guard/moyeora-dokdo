CREATE DATABASE  IF NOT EXISTS `ssafy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ssafy`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: k7d204.p.ssafy.io    Database: ssafy
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dogam`
--

LOCK TABLES `dogam` WRITE;
/*!40000 ALTER TABLE `dogam` DISABLE KEYS */;
INSERT INTO `dogam` VALUES (1,'seaAnimal','파랑돔',8),(2,'seaAnimal','돌고래',8),(3,'seaAnimal','강치(바다사자)',8),(4,'plant','박주가리',8),(5,'plant','동백나무',8),(6,'bird','바다비오리',8),(7,'bird','흑비둘기',8),(8,'seaAnimal','청황베도라치',8),(9,'seaAnimal','바위게',8),(10,'seaAnimal','꽃새우',8),(11,'seaAnimal','잿방어',8),(12,'plant','도깨비쇠고비',8),(13,'seaAnimal','파랑돔',3),(14,'seaAnimal','청황베도라치',3),(15,'seaAnimal','연어병치',10),(16,'seaAnimal','잿방어',10),(17,'seaPlant','참깃털말',8),(18,'seaPlant','구멍갈파래',8),(19,'bird','벌매',8),(20,'plant','갯사상자',8),(21,'plant','왕호장근',8),(22,'bird','흑비둘기',3),(23,'plant','동백나무',3),(24,'plant','갯사상자',3),(25,'plant','마디풀',3),(26,'bird','바다비오리',20),(27,'plant','흰명아주',20),(28,'bird','밭종다리',20),(29,'bird','쇠황조롱이',20),(30,'seaPlant','염주말',20),(31,'bird','물수리',20),(32,'seaAnimal','잿방어',20),(33,'seaPlant','알쏭이모자반',20),(34,'seaAnimal','돌고래',20),(35,'plant','갯사상자',20),(36,'seaPlant','참깃털말',20),(37,'seaAnimal','꽃새우',20),(38,'seaPlant','유착나무돌산호',20),(39,'plant','마디풀',20),(40,'bird','벌매',20),(41,'plant','갯까치수염',20),(42,'seaAnimal','바위게',20),(43,'seaPlant','구멍갈파래',20),(44,'seaAnimal','청황베도라치',20),(45,'seaPlant','그물바구니',12),(46,'seaAnimal','연어병치',12),(47,'seaAnimal','청황베도라치',12),(48,'plant','마디풀',12),(49,'bird','바다비오리',12),(50,'bird','흑비둘기',12),(51,'bird','원앙',12),(52,'seaPlant','바위수염',12),(53,'plant','흰명아주',12),(54,'bird','쇠황조롱이',12),(55,'bird','밭종다리',12),(56,'seaPlant','참깃털말',10),(57,'seaAnimal','청황베도라치',10),(58,'bird','흑비둘기',10),(59,'seaPlant','알쏭이모자반',10),(60,'plant','흰명아주',10),(61,'seaPlant','바위수염',10),(62,'bird','밭종다리',10),(63,'seaAnimal','돌고래',10),(64,'plant','갯까치수염',10),(65,'plant','미나리',10),(66,'bird','벌매',10),(67,'bird','쇠황조롱이',10),(68,'bird','물수리',12),(69,'seaPlant','염주말',12),(70,'seaPlant','참깃털말',12),(71,'seaPlant','그물바구니',10),(72,'bird','물수리',10),(73,'plant','갯사상자',10),(74,'bird','쇠황조롱이',3),(75,'bird','물수리',3),(76,'seaAnimal','꽃새우',3),(77,'plant','왕호장근',3),(78,'bird','쇠황조롱이',8),(79,'bird','밭종다리',8),(80,'bird','딱새',8),(81,'seaPlant','그물바구니',8),(82,'seaPlant','알쏭이모자반',8),(83,'seaPlant','염주말',8),(84,'plant','마디풀',8),(85,'bird','후투티',8),(86,'seaPlant','청각',8),(87,'seaPlant','괭생이모자반',8),(88,'seaAnimal','돌고래',14),(89,'bird','쇠황조롱이',14),(90,'plant','참외',14),(91,'plant','왕호장근',14),(92,'plant','갯까치수염',14),(93,'bird','원앙',14),(94,'plant','갯까치수염',11),(95,'plant','왕호장근',11),(96,'bird','쇠황조롱이',11),(97,'seaAnimal','연어병치',11),(98,'seaPlant','유착나무돌산호',11),(99,'seaPlant','구멍갈파래',11),(100,'seaAnimal','잿방어',33),(101,'bird','후투티',33),(102,'plant','박주가리',33),(103,'bird','벌매',33),(104,'seaPlant','유착나무돌산호',33),(105,'bird','바다비오리',33),(106,'seaAnimal','연어병치',5),(107,'bird','후투티',5),(108,'seaAnimal','바위게',5),(109,'bird','벌매',5),(110,'plant','동백나무',5),(111,'seaPlant','참깃털말',5),(112,'bird','후투티',2),(113,'plant','미나리',2),(114,'plant','동백나무',2),(115,'seaAnimal','도화새우',2),(116,'plant','박주가리',2),(117,'seaPlant','구멍갈파래',2);
/*!40000 ALTER TABLE `dogam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `npc`
--

LOCK TABLES `npc` WRITE;
/*!40000 ALTER TABLE `npc` DISABLE KEYS */;
INSERT INTO `npc` VALUES (26,'Crab',2),(27,'Dolphin',2),(28,'Dog',2),(33,'Flamingo',10),(40,'Pigeon',10),(41,'SeaLion',10),(42,'Dog',10),(43,'Penguin',10),(44,'Dolphin',10),(45,'Prawn',10),(46,'Turtle',10),(47,'Seagull',10),(48,'Crab',10),(49,'Seagull',3),(50,'Dog',3),(51,'Pigeon',3),(52,'Turtle',3),(53,'SeaLion',2),(54,'Flamingo',2),(55,'Turtle',2),(56,'Crab',3),(57,'Flamingo',3),(58,'Flamingo',12),(59,'SeaLion',12),(60,'Pigeon',12),(61,'Pigeon',2),(62,'Penguin',2),(63,'Dog',12),(64,'Dolphin',3),(65,'Prawn',3),(66,'Turtle',12),(67,'Dolphin',12),(68,'Flamingo',16),(69,'Penguin',8),(70,'Pigeon',8),(71,'Seagull',8),(72,'SeaLion',8),(73,'Crab',12),(74,'land_79030',10),(75,'land_79030',10),(76,'land_79030',10),(77,'floor',10),(78,'ocean',10),(79,'Flamingo',8),(80,'Dog',8);
/*!40000 ALTER TABLE `npc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `quiz_user`
--

LOCK TABLES `quiz_user` WRITE;
/*!40000 ALTER TABLE `quiz_user` DISABLE KEYS */;
INSERT INTO `quiz_user` VALUES (1,_binary '\0',_binary '\0',_binary '\0'),(2,_binary '',_binary '',_binary ''),(3,_binary '\0',_binary '',_binary '\0'),(4,_binary '\0',_binary '',_binary '\0'),(5,_binary '\0',_binary '\0',_binary '\0'),(6,_binary '\0',_binary '\0',_binary '\0'),(7,_binary '\0',_binary '\0',_binary '\0'),(8,_binary '',_binary '',_binary ''),(9,_binary '\0',_binary '\0',_binary '\0'),(10,_binary '\0',_binary '',_binary '\0'),(11,_binary '\0',_binary '\0',_binary '\0'),(12,_binary '\0',_binary '',_binary '\0'),(13,_binary '\0',_binary '\0',_binary '\0'),(14,_binary '\0',_binary '',_binary '\0'),(15,_binary '\0',_binary '\0',_binary '\0'),(16,_binary '\0',_binary '\0',_binary '\0'),(69,_binary '\0',_binary '\0',_binary '\0'),(70,_binary '\0',_binary '\0',_binary '\0'),(71,_binary '\0',_binary '\0',_binary '\0'),(73,_binary '\0',_binary '\0',_binary '\0'),(74,_binary '\0',_binary '\0',_binary '\0'),(75,_binary '\0',_binary '\0',_binary '\0'),(76,_binary '\0',_binary '\0',_binary '\0'),(77,_binary '\0',_binary '\0',_binary '\0'),(78,_binary '\0',_binary '\0',_binary '\0'),(79,_binary '\0',_binary '\0',_binary '\0'),(80,_binary '\0',_binary '\0',_binary '\0'),(81,_binary '\0',_binary '\0',_binary '\0'),(82,_binary '\0',_binary '\0',_binary '\0'),(83,_binary '\0',_binary '\0',_binary '\0'),(84,_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `quiz_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ip951122@naver.com','ip95****','naver','HtGdXKZa1vSfPs9lOb-sW5lPR_eCXrYSxFyGULSfkRI','hyoseon',3,1,1,_binary '\0'),(2,'hmr971127@gmail.com','[7기_구미_2반_김성령]','google','108608042657713540399','seongryeong',4,2,2,_binary ''),(3,'khs722100@gmail.com','김효선','google','105433534607036588780','hyoseon',2,4,3,_binary ''),(4,'apso123@naver.com','앱소','naver','zZ6j0FuUyJH9JFSiLuh6X120oyk9UpjU0JQotE6IjYs','siryeong',1,3,4,_binary '\0'),(5,'siryeongchoi@gmail.com','최시령','google','117189741887928750993','siryeong',5,5,5,_binary ''),(6,'nedio12@naver.com','김효선','kakao','2496903612','siryeong',6,6,6,_binary '\0'),(7,'loadine1224@naver.com','시령2022-11-07T00:38:06','kakao','2514835211','siryeong',7,7,7,_binary '\0'),(8,'dlacogus5239@gmail.com','임채현','google','116771863148087772549','chaehyeon',8,8,8,_binary ''),(9,'dlacogus5239@naver.com','임채현','kakao','2515252482','siryeong',9,9,9,_binary '\0'),(10,'bestsojung13@gmail.com','구미_2반_박소정','google','110090630470899834033','sojung',10,10,10,_binary ''),(11,'whdgur1068@gmail.com','HJ','google','112340543181293099990','youngjin',11,11,11,_binary ''),(12,'dakadern@gmail.com','최영진','google','106225062148635203258','siryeong',12,12,12,_binary ''),(13,'showaong@gmail.com','기무지현산','google','106269194347475879989','siryeong',13,13,13,_binary '\0'),(14,'chltlfud@gmail.com','Siryeong','google','107695996447959189627','siryeong',14,14,14,_binary ''),(15,'kbg04111@naver.com','권순웅2022-11-12T07:46:58','kakao','2522337957','chaehyeon',15,15,15,_binary '\0'),(16,'tgd5753@gmail.com','[구미_공통1반_신혜연]','google','114792616535903283332','siryeong',16,16,16,_binary '\0'),(19,'pink5910@naver.com','박소정','kakao','2522928615','siryeong',70,70,19,_binary '\0'),(20,'asd5687@naver.com','김다은','kakao','2537380662','siryeong',71,71,20,_binary '\0'),(22,'apso123@knu.ac.kr','김효선','google','102516783177405167099','siryeong',73,73,22,_binary '\0'),(23,'jhh6822@naver.com','호형','kakao','2537921296','siryeong',74,74,23,_binary ''),(24,'gbwi7000@gmail.com','한상엽','google','110301214423133198825','seongryeong',75,75,24,_binary ''),(25,'jdsaeyqi@gmail.com','이상욱','google','111017061849166838365','siryeong',76,76,25,_binary ''),(26,'cheanju0@gmail.com','운성','google','101869629311666470167','siryeong',77,77,26,_binary '\0'),(27,'yob429@naver.com','여원종','kakao','2538741566','siryeong',78,78,27,_binary '\0'),(28,'wlaqn123@gmail.com','박경열','google','115909433280141252038','sojung',79,79,28,_binary ''),(29,'lwj54481065@gmail.com','조정구','google','103788410756978754157','siryeong',80,80,29,_binary ''),(30,'bae8719@naver.com','배상진','kakao','2539064277','siryeong',81,81,30,_binary ''),(31,'a47833791@gmail.com','안광식','google','112745863825560771097','siryeong',82,82,31,_binary ''),(32,'12161672@inha.edu','최영진/학생/컴퓨터공학','google','104411264130759886395','sojung',83,83,32,_binary ''),(33,'zmstjftk@nate.com','이동욱','kakao','2539776476','siryeong',84,84,33,_binary '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_badge`
--

LOCK TABLES `user_badge` WRITE;
/*!40000 ALTER TABLE `user_badge` DISABLE KEYS */;
INSERT INTO `user_badge` VALUES (1,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(2,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(3,_binary '',_binary '',_binary '',_binary '',_binary '',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(4,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary ''),(5,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(6,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',_binary '',_binary '\0',_binary '',_binary '',_binary ''),(9,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(10,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(11,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(12,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(13,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(14,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(15,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(16,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(18,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(19,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(20,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(22,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(23,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary ''),(24,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary ''),(25,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(26,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(27,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(28,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(29,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',_binary ''),(30,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(31,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(32,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(33,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',_binary '');
/*!40000 ALTER TABLE `user_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `visited`
--

LOCK TABLES `visited` WRITE;
/*!40000 ALTER TABLE `visited` DISABLE KEYS */;
INSERT INTO `visited` VALUES (1,_binary '',_binary '',_binary '\0'),(2,_binary '\0',_binary '\0',_binary '\0'),(3,_binary '\0',_binary '\0',_binary '\0'),(4,_binary '\0',_binary '\0',_binary '\0'),(5,_binary '\0',_binary '\0',_binary '\0'),(6,_binary '\0',_binary '\0',_binary '\0'),(7,_binary '\0',_binary '\0',_binary '\0'),(8,_binary '\0',_binary '\0',_binary '\0'),(9,_binary '\0',_binary '\0',_binary '\0'),(10,_binary '\0',_binary '\0',_binary '\0'),(11,_binary '\0',_binary '\0',_binary '\0'),(12,_binary '\0',_binary '\0',_binary '\0'),(13,_binary '\0',_binary '\0',_binary '\0'),(14,_binary '\0',_binary '\0',_binary '\0'),(15,_binary '\0',_binary '\0',_binary '\0'),(16,_binary '\0',_binary '\0',_binary '\0'),(69,_binary '\0',_binary '\0',_binary '\0'),(70,_binary '\0',_binary '\0',_binary '\0'),(71,_binary '\0',_binary '\0',_binary '\0'),(73,_binary '\0',_binary '\0',_binary '\0'),(74,_binary '\0',_binary '\0',_binary '\0'),(75,_binary '\0',_binary '\0',_binary '\0'),(76,_binary '\0',_binary '\0',_binary '\0'),(77,_binary '\0',_binary '\0',_binary '\0'),(78,_binary '\0',_binary '\0',_binary '\0'),(79,_binary '\0',_binary '\0',_binary '\0'),(80,_binary '\0',_binary '\0',_binary '\0'),(81,_binary '\0',_binary '\0',_binary '\0'),(82,_binary '\0',_binary '\0',_binary '\0'),(83,_binary '\0',_binary '\0',_binary '\0'),(84,_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `visited` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 17:53:50
