/*
  Warnings:

  - You are about to drop the column `patients` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `patienDe` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `status` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `patients`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `patienDe`,
    ADD COLUMN `doctorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
