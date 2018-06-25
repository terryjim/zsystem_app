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

 Date: 25/06/2018 17:18:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access_control_hardware
-- ----------------------------
DROP TABLE IF EXISTS `access_control_hardware`;
CREATE TABLE `access_control_hardware`  (
  `access_control_id` bigint(18) NOT NULL,
  `hardware_id` bigint(18) NOT NULL,
  `entrance_type` smallint(4) NOT NULL COMMENT '硬件类型 1: 匝道 2: 探头',
  `entrance_direction` smallint(4) NOT NULL COMMENT '出入类型  0：入口； 1: 出口',
  `created_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`access_control_id`, `hardware_id`) USING BTREE,
  INDEX `fk_AccessControl_has_AccessHardware_AccessHardware1_idx`(`hardware_id`) USING BTREE,
  INDEX `fk_AccessControl_has_AccessHardware_AccessControl1_idx`(`access_control_id`) USING BTREE,
  CONSTRAINT `fk_AccessControl_has_AccessHardware_AccessControl1` FOREIGN KEY (`access_control_id`) REFERENCES `access_control` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_AccessControl_has_AccessHardware_AccessHardware1` FOREIGN KEY (`hardware_id`) REFERENCES `access_hardware` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '门禁硬件表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
