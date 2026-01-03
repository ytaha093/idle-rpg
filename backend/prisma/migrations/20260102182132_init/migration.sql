-- CreateEnum
CREATE TYPE "ItemId" AS ENUM ('Gold', 'Credits', 'DungeoneeringTokens', 'GatheringSkillShard', 'ArtisanShard', 'ResourceCache', 'Metal', 'Wood', 'Stone', 'WeaponComponent', 'ArmorComponent', 'ToolComponent', 'GemFragment', 'RunicLeather', 'Ruby', 'Diamond', 'Dragonstone', 'Onyx', 'Sandstone', 'Marble', 'Malachite', 'RuneOfLesserFocus', 'RuneOfAdeptFocus', 'RuneOfGreaterFocus', 'RuneOfTheWarrior', 'RuneOfTheGladiator', 'RuneOfTheLegend', 'RuneOfTheWarlord', 'GreaterRuneOfTheWarlord', 'GoblinCaveKey', 'TrollStrongholdKey', 'BarrowsTombKey', 'DemonicRuinsKey', 'DragonLairKey', 'GodWarsKey', 'AncientVaultKey', 'TreeSap', 'SpiderEgg', 'BoneMeal', 'AlchemicalDust', 'VialOfTrollBlood', 'UndeadHeart', 'BirdsNest', 'AlchemicEssence', 'GoldenEgg', 'DemonicDust');

-- CreateEnum
CREATE TYPE "TrainingAttribute" AS ENUM ('Health', 'Attack', 'Defense', 'Accuracy', 'Dodge', 'GoldRush', 'Mining', 'Woodcutting', 'Quarrying', 'ClanBoost');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "userId" INTEGER NOT NULL,
    "maxEnergy" INTEGER NOT NULL DEFAULT 10,
    "currentEnergy" INTEGER NOT NULL DEFAULT 10,
    "bonusCap" INTEGER NOT NULL DEFAULT 5,
    "bonusProgress" INTEGER NOT NULL DEFAULT 0,
    "trainingAttribute" "TrainingAttribute" NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Skills" (
    "userId" INTEGER NOT NULL,
    "Battling" INTEGER NOT NULL DEFAULT 0,
    "Dungeoneering" INTEGER NOT NULL DEFAULT 0,
    "Mining" INTEGER NOT NULL DEFAULT 0,
    "Woodcutting" INTEGER NOT NULL DEFAULT 0,
    "Quarrying" INTEGER NOT NULL DEFAULT 0,
    "Runecrafting" INTEGER NOT NULL DEFAULT 0,
    "Jewelcrafting" INTEGER NOT NULL DEFAULT 0,
    "Herblore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "userId" INTEGER NOT NULL,
    "Health" INTEGER NOT NULL DEFAULT 0,
    "Attack" INTEGER NOT NULL DEFAULT 0,
    "Defense" INTEGER NOT NULL DEFAULT 0,
    "Accuracy" INTEGER NOT NULL DEFAULT 0,
    "Dodge" INTEGER NOT NULL DEFAULT 0,
    "GoldRush" INTEGER NOT NULL DEFAULT 0,
    "Mining" INTEGER NOT NULL DEFAULT 0,
    "Woodcutting" INTEGER NOT NULL DEFAULT 0,
    "Quarrying" INTEGER NOT NULL DEFAULT 0,
    "ClanBoost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "userId" INTEGER NOT NULL,
    "MainWeaponLevel" INTEGER NOT NULL DEFAULT 1,
    "MainWeaponQuality" INTEGER NOT NULL DEFAULT 1,
    "OffWeaponLevel" INTEGER NOT NULL DEFAULT 1,
    "OffWeaponQuality" INTEGER NOT NULL DEFAULT 1,
    "HelmLevel" INTEGER NOT NULL DEFAULT 1,
    "HelmQuality" INTEGER NOT NULL DEFAULT 1,
    "ArmorLevel" INTEGER NOT NULL DEFAULT 1,
    "ArmorQuality" INTEGER NOT NULL DEFAULT 1,
    "GauntletsLevel" INTEGER NOT NULL DEFAULT 1,
    "GauntletsQuality" INTEGER NOT NULL DEFAULT 1,
    "LegsLevel" INTEGER NOT NULL DEFAULT 1,
    "LegsQuality" INTEGER NOT NULL DEFAULT 1,
    "BootsLevel" INTEGER NOT NULL DEFAULT 1,
    "BootsQuality" INTEGER NOT NULL DEFAULT 1,
    "PickaxeLevel" INTEGER NOT NULL DEFAULT 1,
    "PickaxeQuality" INTEGER NOT NULL DEFAULT 1,
    "HatchetLevel" INTEGER NOT NULL DEFAULT 1,
    "HatchetQuality" INTEGER NOT NULL DEFAULT 1,
    "HammerLevel" INTEGER NOT NULL DEFAULT 1,
    "HammerQuality" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "userId" INTEGER NOT NULL,
    "itemId" "ItemId" NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("userId","itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_userId_key" ON "Equipment"("userId");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
