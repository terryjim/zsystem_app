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

 Date: 25/06/2018 17:18:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access_hardware
-- ----------------------------
DROP TABLE IF EXISTS `access_hardware`;
CREATE TABLE `access_hardware`  (
  `id` bigint(18) NOT NULL,
  `category` smallint(4) NOT NULL COMMENT '硬件类型。001: 蓝牙、010: 二维码',
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `hardware_code` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '硬件编号',
  `hardware_ver` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '硬件版本',
  `hardware_mac` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '硬件MAC',
  `hardware_key` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '硬件密码',
  `manufacturer` bigint(18) NOT NULL COMMENT '制造商',
  `shake_rssi` smallint(4) NULL DEFAULT NULL COMMENT '蓝牙摇一摇距离',
  `near_rssi` smallint(4) NULL DEFAULT NULL COMMENT '靠近距离',
  `created_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of access_hardware
-- ----------------------------
INSERT INTO `access_hardware` VALUES (1, 3, '平治测试门禁', '0002FE', '1', '001B102149F0', '123456', 1, 60, 50, '2018-06-04 15:06:21', '2018-06-25 11:37:57', b'0');
INSERT INTO `access_hardware` VALUES (2, 3, '蓝筹门禁', '2333100088', '1', '28:21:8b:10:48:38', 'cda73877f57142bfb47c6575ca7f6996000000000000000000000000000000001000', 2, 60, 50, '2018-06-04 15:34:06', '2018-06-25 11:37:59', b'0');
INSERT INTO `access_hardware` VALUES (3, 1, '测试1', '0003EF', '1', '001B10312ACA', '123456', 1, 50, 30, '2018-06-07 10:47:08', '2018-06-25 11:38:01', b'0');
INSERT INTO `access_hardware` VALUES (4, 2, '测试2', '0003F1', '1', '001B10214A1F', '123456', 1, 60, 50, '2018-06-07 10:48:28', '2018-06-25 11:38:03', b'0');
INSERT INTO `access_hardware` VALUES (5, 1, '平治测试门禁', '0003F0', '1', '001B10312AD6', '123456', 1, 1, 50, '2018-06-04 15:06:21', '2018-06-25 11:38:05', b'0');
INSERT INTO `access_hardware` VALUES (460836952577409024, 1, '1231313q', 'asdfasfd', NULL, NULL, NULL, 1, NULL, NULL, '2018-06-25 16:01:31', '2018-06-25 16:01:31', b'0');

SET FOREIGN_KEY_CHECKS = 1;
