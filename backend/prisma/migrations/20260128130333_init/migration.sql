/*
  Warnings:

  - You are about to alter the column `amount` on the `InventoryItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Battling` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Dungeoneering` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Mining` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Woodcutting` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Quarrying` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Runecrafting` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Jewelcrafting` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.
  - You are about to alter the column `Herblore` on the `Skills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,0)`.

*/
-- AlterTable
ALTER TABLE "InventoryItem" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,0);

-- AlterTable
ALTER TABLE "Skills" ALTER COLUMN "Battling" SET DATA TYPE DECIMAL(65,0),
ALTER COLUMN "Dungeoneering" SET DATA TYPE DECIMAL(65,0),
ALTER COLUMN "Mining" SET DATA TYPE DECIMAL(65,0),
ALTER COLUMN "Woodcutting" SET DATA TYPE DECIMAL(65,0),
ALTER COLUMN "Quarrying" SET DATA TYPE DECIMAL(65,0),
ALTER COLUMN "Runecrafting" SET DATA TYPE DECIMAL(65,0),
ALTER COLUMN "Jewelcrafting" SET DATA TYPE DECIMAL(65,0),
ALTER COLUMN "Herblore" SET DATA TYPE DECIMAL(65,0);
