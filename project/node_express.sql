/*
SQLyog Community Edition- MySQL GUI v6.16
MySQL - 5.5.5-10.1.28-MariaDB : Database - node_express
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `node_express`;

USE `node_express`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `isn_category_details` */

DROP TABLE IF EXISTS `isn_category_details`;

CREATE TABLE `isn_category_details` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(2000) DEFAULT NULL,
  `user_id` int(5) DEFAULT NULL,
  `upload_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('0','1') DEFAULT '1' COMMENT '0-> inactive, 1->active',
  `delete_status` enum('0','1') DEFAULT '1' COMMENT '0->Soft Delete, 1->not deleterecord  ',
  `ip` varchar(100) DEFAULT NULL,
  `created_by` varchar(2000) DEFAULT NULL,
  `update_by` varchar(2000) DEFAULT NULL,
  `insert_date` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `isn_category_details` */

insert  into `isn_category_details`(`category_id`,`category_name`,`user_id`,`upload_date`,`status`,`delete_status`,`ip`,`created_by`,`update_by`,`insert_date`) values (1,'Electronics',1,'2018-01-18 11:21:45','1','1','192.168.1.12','2017-12-09 11:29:05','2018-01-18 11:21:45',NULL),(2,'Fashion',1,'2018-01-16 11:16:33','1','1','192.168.1.15','2017-12-09 10:38:19','2018-01-16 11:16:33',NULL),(3,'Events',1,'2018-01-16 11:15:54','1','1','192.168.1.12','2017-12-09 10:38:30',NULL,NULL),(4,'Professional Services',1,'2018-01-27 10:48:07','1','1','192.168.1.12','2017-12-12 11:06:16','2018-01-27 10:48:07',NULL),(5,'mobile',1,'2018-01-18 11:21:58','1','1','192.168.1.15','2018-01-17 18:00:54','2018-01-18 11:21:58','2018-01-17'),(7,'test',1,'2018-01-18 12:23:48','1','1','192.168.1.12','2018-01-18 12:23:48',NULL,'2018-01-18'),(9,'vinay',NULL,'2018-09-27 12:51:07','1','1',NULL,NULL,NULL,NULL),(10,'sfsf',NULL,'2018-10-01 16:36:59','1','1',NULL,NULL,NULL,NULL),(11,'ttrr',NULL,'2018-10-09 11:28:46','1','1',NULL,NULL,NULL,NULL),(12,'ttmm',NULL,'2018-10-09 11:29:02','1','1',NULL,NULL,NULL,NULL),(13,'tteeasdasd',NULL,'2018-10-09 12:13:34','1','1',NULL,NULL,NULL,NULL);

/*Table structure for table `isn_user_info_details` */

DROP TABLE IF EXISTS `isn_user_info_details`;

CREATE TABLE `isn_user_info_details` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_unique_id` varchar(100) DEFAULT NULL,
  `user_type_id` int(5) DEFAULT NULL,
  `category_id` varchar(200) DEFAULT NULL,
  `sub_category_id` varchar(200) DEFAULT NULL,
  `user_name` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(2000) DEFAULT NULL,
  `email_id` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `email_id_old` varchar(500) DEFAULT NULL,
  `mobile_number` varchar(2000) DEFAULT NULL,
  `mobile_number_old` varchar(500) DEFAULT NULL,
  `alternate_mobile_number` varchar(500) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `first_name` varchar(500) DEFAULT NULL,
  `last_name` varchar(500) DEFAULT NULL,
  `full_name` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL COMMENT '0->male, 1->female, 2->other',
  `flat_number` varchar(100) DEFAULT NULL,
  `address` text CHARACTER SET utf8,
  `city_name` varchar(100) DEFAULT NULL,
  `state_name` varchar(100) DEFAULT NULL,
  `country_name` varchar(100) DEFAULT NULL,
  `pincode` varchar(200) DEFAULT NULL,
  `latitude` varchar(2000) DEFAULT NULL,
  `longitude` varchar(2000) DEFAULT NULL,
  `lat_long` varchar(3000) DEFAULT NULL,
  `communication_address` text,
  `organization_name` varchar(200) DEFAULT NULL,
  `authority_name` varchar(100) DEFAULT NULL,
  `identity_card` varchar(250) DEFAULT NULL,
  `pan_number` varchar(1000) DEFAULT NULL,
  `pan_card_file` varchar(100) DEFAULT NULL,
  `identity_name` varchar(100) DEFAULT NULL,
  `aadhar_number` varchar(2000) DEFAULT NULL,
  `address_proof_file` varchar(100) DEFAULT NULL,
  `education` varchar(400) DEFAULT NULL COMMENT '0->graduate, 1->post graduate, 2->non graduate',
  `occupation` varchar(400) DEFAULT NULL COMMENT '0->salaried, 1->nonsalaried',
  `marital_status` varchar(200) DEFAULT NULL COMMENT '0->single, 1->married, 2->windowed, 3->divorced/Separated',
  `anniversary_date` date DEFAULT NULL,
  `total_point` varchar(100) DEFAULT '0',
  `point_redeemed` varchar(100) DEFAULT '0',
  `point_remaining` varchar(100) DEFAULT '0',
  `google_social_id` varchar(1000) DEFAULT NULL,
  `fb_social_id` varchar(1000) DEFAULT NULL,
  `login_type_name` varchar(100) DEFAULT 'App',
  `login_type` enum('0','1','2','3') DEFAULT '0' COMMENT '0->App, 1->App (FB), 2->App (G+), 3->Web',
  `otp` varchar(100) DEFAULT NULL,
  `otp_verified` enum('0','1') DEFAULT '0' COMMENT '0->not verified, 1->veryfi',
  `is_social_login` varchar(100) DEFAULT NULL,
  `parent_id` int(5) DEFAULT NULL COMMENT 'merchant id',
  `agent_id` int(5) DEFAULT NULL COMMENT 'only sales person',
  `agent_code` varchar(100) DEFAULT NULL COMMENT 'sales person unique id',
  `gst_number` varchar(150) DEFAULT NULL,
  `add_from` enum('0','1') DEFAULT NULL COMMENT '0->website, 1->mobile',
  `source` enum('0','1','2','3') DEFAULT NULL COMMENT '0->frontend web, 1->backend web, 2->android, 3->ios',
  `register_by` varchar(100) DEFAULT NULL COMMENT '0->app fb, 1->app g+, 2->app, 3->web',
  `backend_user_id` int(5) DEFAULT NULL,
  `show_md` varchar(200) DEFAULT NULL,
  `work_experience` varbinary(100) DEFAULT NULL,
  `is_login_complete` enum('0','1') DEFAULT NULL COMMENT '0->not complete, 1->complete',
  `register_lat` varchar(500) DEFAULT NULL,
  `register_long` varchar(500) DEFAULT NULL,
  `register_lat_long` varchar(1000) DEFAULT NULL,
  `register_address` text,
  `kyc_status` varchar(100) DEFAULT 'No' COMMENT '0->yes, 1->no',
  `kyc_remark` text,
  `profile_complete` varchar(100) DEFAULT NULL,
  `mac_address` varchar(500) DEFAULT NULL,
  `build_id` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `meta_keywords` varchar(2000) DEFAULT NULL,
  `delete_status` enum('0','1') DEFAULT '1' COMMENT '0->Soft Delete, 1->not deleterecord',
  `status` enum('0','1') DEFAULT '1' COMMENT '0->nonactive, 1->active',
  `upload_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` varchar(100) DEFAULT NULL,
  `created_by` varchar(2000) DEFAULT NULL,
  `update_by` varchar(2000) DEFAULT NULL,
  `insert_date` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `isn_user_info_details` */

insert  into `isn_user_info_details`(`user_id`,`user_unique_id`,`user_type_id`,`category_id`,`sub_category_id`,`user_name`,`password`,`email_id`,`email_id_old`,`mobile_number`,`mobile_number_old`,`alternate_mobile_number`,`avatar`,`first_name`,`last_name`,`full_name`,`dob`,`gender`,`flat_number`,`address`,`city_name`,`state_name`,`country_name`,`pincode`,`latitude`,`longitude`,`lat_long`,`communication_address`,`organization_name`,`authority_name`,`identity_card`,`pan_number`,`pan_card_file`,`identity_name`,`aadhar_number`,`address_proof_file`,`education`,`occupation`,`marital_status`,`anniversary_date`,`total_point`,`point_redeemed`,`point_remaining`,`google_social_id`,`fb_social_id`,`login_type_name`,`login_type`,`otp`,`otp_verified`,`is_social_login`,`parent_id`,`agent_id`,`agent_code`,`gst_number`,`add_from`,`source`,`register_by`,`backend_user_id`,`show_md`,`work_experience`,`is_login_complete`,`register_lat`,`register_long`,`register_lat_long`,`register_address`,`kyc_status`,`kyc_remark`,`profile_complete`,`mac_address`,`build_id`,`meta_description`,`meta_keywords`,`delete_status`,`status`,`upload_date`,`ip`,`created_by`,`update_by`,`insert_date`) values (1,'ABCD',5,NULL,NULL,'Super Admin','21232f297a57a5a743894a0e4a801fc3','admin@gmail.com','admin@gmail.com','9876543210','9876543210',NULL,'ish-logo.png',NULL,NULL,'Super Admin','2017-11-09','1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0','0','1','2017-09-19','',NULL,'',NULL,NULL,NULL,NULL,NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin',NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1','1','2018-07-31 12:57:56','192.168.1.12','2017-12-23 10:37:47','2018-01-09 18:23:48',NULL);

/*Table structure for table `u_file_upload` */

DROP TABLE IF EXISTS `u_file_upload`;

CREATE TABLE `u_file_upload` (
  `file_upload_id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`file_upload_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `u_file_upload` */

insert  into `u_file_upload`(`file_upload_id`,`file_name`) values (4,'Poll_SurveyN.png');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(12) NOT NULL,
  `customer_code` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `marital_status` varchar(255) DEFAULT NULL,
  `anniversary_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
