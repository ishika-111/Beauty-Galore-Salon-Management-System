/*
  Warnings:

  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `category` ENUM('HAIR_TOOLS_AND_APPLIANCES', 'HAIR_COLOR', 'HAIR_CARE', 'SKINCARE', 'NAILS') NOT NULL;
