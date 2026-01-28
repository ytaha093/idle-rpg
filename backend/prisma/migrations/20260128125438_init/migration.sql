/*
  Warnings:

  - You are about to alter the column `Battling` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `Dungeoneering` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `Mining` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `Woodcutting` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `Quarrying` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `Runecrafting` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `Jewelcrafting` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `Herblore` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Skills" ALTER COLUMN "Battling" SET DEFAULT 0,
ALTER COLUMN "Battling" SET DATA TYPE INTEGER,
ALTER COLUMN "Dungeoneering" SET DEFAULT 0,
ALTER COLUMN "Dungeoneering" SET DATA TYPE INTEGER,
ALTER COLUMN "Mining" SET DEFAULT 0,
ALTER COLUMN "Mining" SET DATA TYPE INTEGER,
ALTER COLUMN "Woodcutting" SET DEFAULT 0,
ALTER COLUMN "Woodcutting" SET DATA TYPE INTEGER,
ALTER COLUMN "Quarrying" SET DEFAULT 0,
ALTER COLUMN "Quarrying" SET DATA TYPE INTEGER,
ALTER COLUMN "Runecrafting" SET DEFAULT 0,
ALTER COLUMN "Runecrafting" SET DATA TYPE INTEGER,
ALTER COLUMN "Jewelcrafting" SET DEFAULT 0,
ALTER COLUMN "Jewelcrafting" SET DATA TYPE INTEGER,
ALTER COLUMN "Herblore" SET DEFAULT 0,
ALTER COLUMN "Herblore" SET DATA TYPE INTEGER;
