/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : zsystem

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 25/06/2018 17:18:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access_control
-- ----------------------------
DROP TABLE IF EXISTS `access_control`;
CREATE TABLE `access_control`  (
  `id` bigint(18) NOT NULL,
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '门禁描述',
  `project_id` bigint(18) NOT NULL COMMENT '楼盘',
  `building_id` bigint(18) NULL DEFAULT NULL COMMENT '楼栋',
  `location` json NULL,
  `public_control` smallint(4) NULL DEFAULT NULL COMMENT '公共授权对应\n00001 ：project\n00010 :  building\n00100 :  unit\n01000 :  floor\n10000 :  room',
  `is_enabled` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否启用',
  `created_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE,
  INDEX `fk_AccessControl_Project1_idx`(`project_id`) USING BTREE,
  CONSTRAINT `fk_AccessControl_Project1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of access_control
-- ----------------------------
INSERT INTO `access_control` VALUES (1, '平治测试门禁', 196015270102325729, 196019483884673505, '{\"room\": \"1\", \"unit\": \"1\", \"floor\": \"3\"}', 2, b'1', '2018-06-04 15:56:47', '2018-06-20 17:22:33', b'0');
INSERT INTO `access_control` VALUES (2, '蓝筹测试门禁', 196015270102325729, 196019710293203425, '{\"room\": \"1\", \"unit\": \"1\", \"floor\": \"3\"}', 2, b'1', '2018-06-04 15:56:47', '2018-06-20 17:22:34', b'0');
INSERT INTO `access_control` VALUES (3, '测试1', 196015270102325729, 454610675176570880, '{\"room\": \"1\", \"unit\": \"1\", \"floor\": \"4\"}', 8, b'1', '2018-06-07 10:50:00', '2018-06-20 17:22:35', b'0');
INSERT INTO `access_control` VALUES (4, '测试2', 196015270102325729, 454610675176570880, '{\"room\": \"1\", \"unit\": \"1\", \"floor\": \"5\"}', 8, b'1', '2018-06-07 10:51:21', '2018-06-20 17:22:41', b'0');
INSERT INTO `access_control` VALUES (5, '测试3', 196015270102325729, 454610675176570880, '{\"room\": \"1\", \"unit\": \"1\", \"floor\": \"4\"}', 8, b'1', '2018-06-07 10:51:21', '2018-06-20 17:22:38', b'0');

SET FOREIGN_KEY_CHECKS = 1;
