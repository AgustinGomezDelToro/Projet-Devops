/*
  Warnings:

  - You are about to drop the column `password` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `telephone` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `Color` VARCHAR(191) NULL,
    ADD COLUMN `PatientId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `password`,
    ADD COLUMN `telephone` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_PatientId_fkey` FOREIGN KEY (`PatientId`) REFERENCES `pacientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
