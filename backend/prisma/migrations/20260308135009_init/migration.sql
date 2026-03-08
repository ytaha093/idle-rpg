-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ItemId" ADD VALUE 'HeroicShard';
ALTER TYPE "ItemId" ADD VALUE 'HealthUpgradeStone';
ALTER TYPE "ItemId" ADD VALUE 'DamageUpgradeStone';

-- AlterTable
ALTER TABLE "Attributes" ALTER COLUMN "Health" SET DEFAULT 10,
ALTER COLUMN "Attack" SET DEFAULT 10,
ALTER COLUMN "Defense" SET DEFAULT 10;

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "MainWeaponLevel" SET DEFAULT 0,
ALTER COLUMN "MainWeaponQuality" SET DEFAULT 0,
ALTER COLUMN "OffWeaponLevel" SET DEFAULT 0,
ALTER COLUMN "OffWeaponQuality" SET DEFAULT 0,
ALTER COLUMN "HelmLevel" SET DEFAULT 0,
ALTER COLUMN "HelmQuality" SET DEFAULT 0,
ALTER COLUMN "ArmorLevel" SET DEFAULT 0,
ALTER COLUMN "ArmorQuality" SET DEFAULT 0,
ALTER COLUMN "GauntletsLevel" SET DEFAULT 0,
ALTER COLUMN "GauntletsQuality" SET DEFAULT 0,
ALTER COLUMN "LegsLevel" SET DEFAULT 0,
ALTER COLUMN "LegsQuality" SET DEFAULT 0,
ALTER COLUMN "BootsLevel" SET DEFAULT 0,
ALTER COLUMN "BootsQuality" SET DEFAULT 0,
ALTER COLUMN "PickaxeLevel" SET DEFAULT 0,
ALTER COLUMN "PickaxeQuality" SET DEFAULT 0,
ALTER COLUMN "HatchetLevel" SET DEFAULT 0,
ALTER COLUMN "HatchetQuality" SET DEFAULT 0,
ALTER COLUMN "HammerLevel" SET DEFAULT 0,
ALTER COLUMN "HammerQuality" SET DEFAULT 0;
