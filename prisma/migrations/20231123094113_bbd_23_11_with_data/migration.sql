-- AlterTable
ALTER TABLE `event` ADD COLUMN `doctorId` INTEGER NULL;

-- CreateTable
CREATE TABLE `doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `eventsHistory` VARCHAR(191) NOT NULL,
    `patients` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
