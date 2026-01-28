/*
  Warnings:

  - You are about to drop the column `ClanBoost` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `GoldRush` on the `Attributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "ClanBoost",
DROP COLUMN "GoldRush",
ADD COLUMN     "Clan_Boost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Gold_Rush" INTEGER NOT NULL DEFAULT 0;
