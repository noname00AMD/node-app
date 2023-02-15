/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 8.0.32 : Database - news
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`news` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `news`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(100) NOT NULL DEFAULT 'Uncategory',
  `slug` varchar(100) NOT NULL DEFAULT 'Uncategory',
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  `size` int NOT NULL DEFAULT '0',
  `parent` int DEFAULT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'category',
  `discription` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`,`visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `category` */

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sessions` */

insert  into `sessions`(`session_id`,`expires`,`data`) values 
('ZjAJrbl8WV_akwucgvMyagIEP897_Vxb',1675954305,'{\"cookie\":{\"originalMaxAge\":1206772,\"expires\":\"2023-02-09T14:16:24.801Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');

/*Table structure for table `siteinfo` */

DROP TABLE IF EXISTS `siteinfo`;

CREATE TABLE `siteinfo` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `value` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `siteinfo` */

insert  into `siteinfo`(`id`,`key`,`value`) values 
(1,'langDefault','vi'),
(2,'description','ahihi');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
