-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 23-11-2023 a las 13:30:50
-- Versión del servidor: 5.7.39
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clinicauja`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eventsHistory` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `doctor`
--

INSERT INTO `doctor` (`id`, `name`, `email`, `telephone`, `eventsHistory`, `createAt`, `updateAt`) VALUES
(1, 'Nombre del Doctor', 'email@example.com', '1234567890', 'Historique de events', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000'),
(2, 'DOCTOR2', 'DOCTOR2@example.com', '1234522890', 'History de events', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000'),
(6, 'Doctor 5', 'doctor5@example.com', '1234567891', 'Historial de eventos', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000'),
(7, 'Doctor 3', 'doctor3@example.com', '1234567892', 'Historial de eventos', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000'),
(8, 'Doctor 4', 'doctor4@example.com', '1234567893', 'Historial de eventos', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `Subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StartTime` datetime(3) NOT NULL,
  `EndTime` datetime(3) NOT NULL,
  `Color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PatientId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `doctorId` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `odontograma`
--

CREATE TABLE `odontograma` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinicHistory` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `patienDe` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinicHistory` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doctorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `name`, `email`, `role`, `clinicHistory`, `createAt`, `updateAt`, `telephone`, `doctorId`) VALUES
(1, 'Emilie Dupont', 'ejemplo1@gmail.com', 'Paciente', 'Historia Clinica 1', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030405', 1),
(2, 'Sophie Martin', 'ejemplo2@gmail.com', 'Paciente', 'Historia Clinica 2', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030406', 1),
(3, 'Lucas Bernard', 'ejemplo3@gmail.com', 'Paciente', 'Historia Clinica 3', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030407', 1),
(4, 'Chloé Petit', 'ejemplo4@gmail.com', 'Paciente', 'Historia Clinica 4', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030408', 1),
(5, 'Thomas Leroy', 'ejemplo5@gmail.com', 'Paciente', 'Historia Clinica 5', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030409', 1),
(7, 'patient1', 'ejemplo7@gmail.com', 'Paciente', 'Historia Clinica 1', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030405', 6),
(8, 'patient2', 'ejemplo8@gmail.com', 'Paciente', 'Historia Clinica 2', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030406', 7),
(9, 'patient3', 'ejemplo9@gmail.com', 'Paciente', 'Historia Clinica 3', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030407', 8),
(10, 'patient4', 'ejemplo10@gmail.com', 'Paciente', 'Historia Clinica 4', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030408', 8),
(11, 'patient5', 'ejemplo11@gmail.com', 'Paciente', 'Historia Clinica 5', '2023-11-21 18:50:47.000', '2023-11-21 18:50:47.000', '0102030409', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('327f5b01-b5b6-41f5-ba61-92db77ce35ca', '7c7dd0e5259ba1a49928b3aa549138436c2e9732a7a986cbafa7eaddaf821fe8', '2023-11-23 10:51:20.108', '20231123094113_bbd_23_11_with_data', NULL, NULL, '2023-11-23 10:51:20.019', 1),
('39117dac-fdd5-494c-b3e1-5db20326b373', 'dc2ef643deacb551f7a24c178c2e17b7b354cceff84e6b2efa827464a4a496cd', '2023-11-23 10:51:20.906', '20231123105120_bbd_23_11_with_data2', NULL, NULL, '2023-11-23 10:51:20.787', 1),
('3d9eb2af-5a6e-4e07-8fbf-729fc8b1f819', 'b65c6874db80fa31db88c3b40561541a87f1f2fec9cea4a221b6dd7198045adf', '2023-11-23 10:56:20.881', '20231123105620_bbd_23_11_with_data3', NULL, NULL, '2023-11-23 10:56:20.793', 1),
('5b18fadb-9bd1-4259-8038-8990aaa6e048', '8ae29fd810108b0eef9164c65f6807a822fadc7dd3db1f0a9a151df1c078e72c', '2023-11-23 10:51:20.019', '20230925150603_bdd_de_base', NULL, NULL, '2023-11-23 10:51:19.878', 1),
('733220ad-9d53-4f88-b2f2-f07b4297f1f8', '2a4eecc735a557fda07ae6b6050ab0eb973d682d214d8987669487d1ab5fbcf8', '2023-11-23 10:51:19.878', '20230826161446_init', NULL, NULL, '2023-11-23 10:51:19.773', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `doctor_email_key` (`email`);

--
-- Indices de la tabla `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_PatientId_fkey` (`PatientId`),
  ADD KEY `event_userId_fkey` (`userId`),
  ADD KEY `event_doctorId_fkey` (`doctorId`);

--
-- Indices de la tabla `odontograma`
--
ALTER TABLE `odontograma`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `odontograma_email_key` (`email`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pacientes_email_key` (`email`),
  ADD KEY `pacientes_doctorId_fkey` (`doctorId`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_key` (`email`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `odontograma`
--
ALTER TABLE `odontograma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_PatientId_fkey` FOREIGN KEY (`PatientId`) REFERENCES `pacientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `event_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
