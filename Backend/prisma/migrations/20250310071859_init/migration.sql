/*
  Warnings:

  - A unique constraint covering the columns `[date,time]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `time` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Appointment_date_time_key` ON `Appointment`(`date`, `time`);

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
