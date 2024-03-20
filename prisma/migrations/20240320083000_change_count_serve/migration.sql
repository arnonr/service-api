/*
  Warnings:

  - You are about to drop the column `count_serve` on the `serve` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `serve` DROP COLUMN `count_serve`,
    ADD COLUMN `count_views` INTEGER NOT NULL DEFAULT 0;
