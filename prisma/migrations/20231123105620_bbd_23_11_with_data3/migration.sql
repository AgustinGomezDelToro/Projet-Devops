/*
  Warnings:

  - Made the column `doctorId` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_doctorId_fkey`;

-- AlterTable
ALTER TABLE `event` MODIFY `doctorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
