/*
  Warnings:

  - You are about to drop the `doctor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `pacientes` DROP FOREIGN KEY `pacientes_doctorId_fkey`;

-- DropTable
DROP TABLE `doctor`;

-- CreateTable
CREATE TABLE `doctorazerty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `eventsHistory` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctorazerty_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctorazerty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctorazerty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
