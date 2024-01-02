-- Adminer 4.8.1 MySQL 10.11.4-MariaDB-1~deb12u1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DELIMITER ;;

DROP PROCEDURE IF EXISTS `GenerateRandomReservation`;;
CREATE PROCEDURE `GenerateRandomReservation`(OUT `reservationReference` varchar(10) CHARACTER SET 'utf8mb4')
BEGIN
    DECLARE characters CHAR(36);
    DECLARE i INT DEFAULT 1;
    DECLARE randomChar CHAR(1);
    
    SET characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    REPEAT
        SET reservationReference = '';
        
        WHILE i <= 10 DO
            SET randomChar = SUBSTRING(characters, FLOOR(1 + RAND() * 36), 1);
            SET reservationReference = CONCAT(reservationReference, randomChar);
            SET i = i + 1;
        END WHILE;
        
    UNTIL NOT EXISTS (SELECT 1 FROM Reservation WHERE id = reservationReference)
    END REPEAT;
END;;

DROP PROCEDURE IF EXISTS `updateReservationStatus`;;
CREATE PROCEDURE `updateReservationStatus`()
BEGIN
    UPDATE Reservation
    SET reservationStatus = 'CLOSED'
    WHERE (reservationDate <= NOW() AND reservationStatus = 'PENDING')
        OR (reservationDate <= DATE_SUB(NOW(), INTERVAL 1 DAY) AND reservationStatus = 'CONFIRMED');
END;;

DELIMITER ;

DROP TABLE IF EXISTS `Permission`;
CREATE TABLE `Permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Permission` (`id`, `permissionName`, `description`) VALUES
(1,	'Admin',	'Administrator'),
(2,	'Standard',	'Basic permission, for client.'),
(3,	'Driver',	'Permissions for driver.');

DROP TABLE IF EXISTS `Profile`;
CREATE TABLE `Profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Profile_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Profile` (`id`, `userId`, `name`, `birthDate`, `gender`) VALUES
(3,	11,	'Kelolke10',	'2023-12-26',	'Male'),
(5,	13,	'hamza',	'2023-12-31',	'Male'),
(29,	40,	'Hamza Iqbal',	'2000-01-01',	'Female');

DROP TABLE IF EXISTS `Reservation`;
CREATE TABLE `Reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationRef` varchar(10) DEFAULT NULL,
  `reservationDate` datetime NOT NULL,
  `pickupLocation` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `reservationStatus` enum('CANCELLED','PENDING','CONFIRMED','FULFILLED','CLOSED') NOT NULL DEFAULT 'PENDING',
  `passengers` int(11) DEFAULT NULL,
  `luggage` int(11) DEFAULT NULL,
  `clientId` int(11) NOT NULL,
  `driverId` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservationRef` (`reservationRef`),
  KEY `driverId` (`driverId`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `Reservation_ibfk_4` FOREIGN KEY (`driverId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reservation_ibfk_5` FOREIGN KEY (`clientId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Reservation` (`id`, `reservationRef`, `reservationDate`, `pickupLocation`, `destination`, `reservationStatus`, `passengers`, `luggage`, `clientId`, `driverId`, `createdAt`, `updatedAt`) VALUES
(7,	'A88K3SO15N',	'2023-12-28 23:43:28',	'Passeig de gracia',	'Calle Llacuna',	'CLOSED',	1,	1,	11,	NULL,	'2023-12-28 23:43:28.000',	'2023-12-28 23:43:28.000'),
(19,	'49YXUGQA8B',	'2023-12-31 15:05:00',	'Hotel Barcelona Princess',	'El Prat, Barcelona (BCN)',	'CLOSED',	1,	3,	11,	NULL,	'2023-12-30 10:55:27.774',	'2023-12-30 10:55:27.772'),
(23,	'OF37PYPKTC',	'2024-01-10 17:29:25',	'Calle Llacuna',	'Calle Bac de roda',	'PENDING',	1,	1,	11,	NULL,	'2023-12-31 16:36:38.000',	'2023-12-31 16:36:38.000'),
(28,	'S0PHB2FXD2',	'2024-01-30 14:16:00',	'Carrer A Zona Franca',	'Carrer A Zona ',	'CONFIRMED',	1,	0,	40,	NULL,	'2024-01-01 13:16:44.544',	'2024-01-01 13:16:44.542');

DELIMITER ;;

CREATE TRIGGER `beforeInsertReservation` BEFORE INSERT ON `Reservation` FOR EACH ROW
BEGIN
    -- Call the procedure to generate a random reservation reference
    CALL GenerateRandomReservation(NEW.reservationRef);
END;;

DELIMITER ;

DROP TABLE IF EXISTS `Role`;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Role` (`id`, `userId`, `roleName`, `description`) VALUES
(11,	11,	'Default',	'Autogenerated by registration'),
(13,	13,	'Default',	'Autogenerated by registration'),
(37,	40,	'Default',	'Autogenerated by registration');

DROP TABLE IF EXISTS `RolesPermission`;
CREATE TABLE `RolesPermission` (
  `roleId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `RolesPermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `RolesPermission_ibfk_3` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `RolesPermission` (`roleId`, `permissionId`) VALUES
(11,	2),
(13,	3),
(37,	2);

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `contactNumber` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_contactNumber` (`contactNumber`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `User` (`id`, `email`, `password`, `emailVerified`, `contactNumber`, `image`, `createdAt`, `updatedAt`) VALUES
(11,	'client@hotmail.com',	'$2b$12$CRPgrdlldRyyDLCXB/ROJOk139443v63k0mWYRr5C2augdwf4jymy',	NULL,	'+34662240437',	NULL,	'2023-12-24 16:15:58.973',	'2023-12-24 16:15:58.973'),
(13,	'driver@hotmail.com',	'$2b$12$Dj.1ZWIaFGjNrsd7cc42m./vjxoi7KmPXeG26saGjnTsoS9hRGkuS',	NULL,	'+34631816037',	NULL,	'2023-12-24 18:22:21.957',	'2023-12-24 18:22:21.957'),
(40,	'test1@hotmail.com',	'$2b$12$dtII3/qUP6rG1vIP5c5IbOh8YlyzSjKAZWuAmw0iCrRlaeKwWlXky',	NULL,	'+34631816032',	NULL,	'2024-01-01 13:16:44.496',	'2024-01-01 13:16:44.496');

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('9dc90f90-a488-4120-8c1d-635ca624c444',	'278ee88ecffc4e4c17853793eef197d8daa7a79d2c31b16da86bf205daf673e2',	'2023-12-13 20:27:49.659',	'20231213202749_init',	NULL,	NULL,	'2023-12-13 20:27:49.625',	1);

-- 2024-01-01 17:35:52