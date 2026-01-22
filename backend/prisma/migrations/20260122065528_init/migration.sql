/*
  Warnings:

  - The values [GoldRush,ClanBoost] on the enum `TrainingAttribute` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingAttribute_new" AS ENUM ('Health', 'Attack', 'Defense', 'Accuracy', 'Dodge', 'Gold_Rush', 'Mining', 'Woodcutting', 'Quarrying', 'Clan_Boost');
ALTER TABLE "Stats" ALTER COLUMN "trainingAttribute" TYPE "TrainingAttribute_new" USING ("trainingAttribute"::text::"TrainingAttribute_new");
ALTER TYPE "TrainingAttribute" RENAME TO "TrainingAttribute_old";
ALTER TYPE "TrainingAttribute_new" RENAME TO "TrainingAttribute";
DROP TYPE "public"."TrainingAttribute_old";
COMMIT;

-- AlterTable
ALTER TABLE "Stats" ALTER COLUMN "trainingAttribute" SET DEFAULT 'Health';
