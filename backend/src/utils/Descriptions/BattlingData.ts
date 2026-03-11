import { ItemId } from "../../generated/prisma/client"

type zone = { name: string, powerRange: string, loot: { item: ItemId, chance: number, amount: number }[], mobs: { id: number, name: string, power: number, xp: number }[] }

export const battlingData: zone[] = [
    {
        name: "Lumbridge",
        powerRange: "1 - 1,000",
        loot: [
            { item: "WeaponComponent", chance: 50, amount: 1 },
            { item: "ArmorComponent", chance: 50, amount: 1 },
        ],
        mobs: [
            { id: 1, name: "Rat", power: 5, xp: 80 },
            { id: 2, name: "Spider", power: 10, xp: 90 },
            { id: 3, name: "Chicken", power: 25, xp: 100 },
            { id: 4, name: "Frog", power: 40, xp: 110 },
            { id: 5, name: "Man", power: 80, xp: 120 },
            { id: 6, name: "Cow", power: 140, xp: 130 },
            { id: 7, name: "Giant Rat", power: 350, xp: 140 },
            { id: 8, name: "Giant Frog", power: 550, xp: 150 },
            { id: 9, name: "Goblin", power: 750, xp: 160 },
            { id: 10, name: "Goblin Leader", power: 950, xp: 170 },
        ],
    },
    {
        name: "Draynor Village",
        powerRange: "1,000 - 5,000",
        loot: [
            { item: "WeaponComponent", chance: 50, amount: 2 },
            { item: "ArmorComponent", chance: 50, amount: 2 },
        ],
        mobs: [
            { id: 11, name: "Mugger", power: 1100, xp: 180 },
            { id: 12, name: "Thief", power: 1400, xp: 190 },
            { id: 13, name: "Highwayman", power: 1800, xp: 200 },
            { id: 14, name: "Giant Bat", power: 2200, xp: 210 },
            { id: 15, name: "Skeleton", power: 2700, xp: 220 },
            { id: 16, name: "Zombie", power: 3200, xp: 230 },
            { id: 17, name: "Ghoul", power: 3700, xp: 240 },
            { id: 18, name: "Vampyre Juvenile", power: 4100, xp: 250 },
            { id: 19, name: "Draynor Werewolf", power: 4500, xp: 260 },
            { id: 20, name: "Count Draynor", power: 4900, xp: 270 },
        ],
    },

    {
        name: "Varrock Sewers",
        powerRange: "5,000 - 25,000",
        loot: [
            { item: "WeaponComponent", chance: 49, amount: 3 },
            { item: "ArmorComponent", chance: 49, amount: 3 },
            { item: "ToolComponent", chance: 2, amount: 1 },

        ],
        mobs: [
            { id: 21, name: "Sewer Slime", power: 5500, xp: 280 },
            { id: 22, name: "Flesh Crawler", power: 7000, xp: 290 },
            { id: 23, name: "Giant Spider", power: 9000, xp: 300 },
            { id: 24, name: "Zombie Rat", power: 11000, xp: 310 },
            { id: 25, name: "Skeleton Mage", power: 13500, xp: 320 },
            { id: 26, name: "Zombie Guard", power: 16000, xp: 330 },
            { id: 27, name: "Moss Giant", power: 18500, xp: 340 },
            { id: 28, name: "Ankou", power: 21000, xp: 350 },
            { id: 29, name: "Varrock Ankou", power: 23000, xp: 360 },
            { id: 30, name: "Sewer Abomination", power: 24500, xp: 370 },
        ],
    },

    {
        name: "Al Kharid Desert",
        powerRange: "25,000 - 100,000",
        loot: [
            { item: "WeaponComponent", chance: 48.5, amount: 4 },
            { item: "ArmorComponent", chance: 48.5, amount: 4 },
            { item: "ToolComponent", chance: 3, amount: 1 },
        ],
        mobs: [
            { id: 31, name: "Desert Snake", power: 26000, xp: 380 },
            { id: 32, name: "Scorpion", power: 32000, xp: 390 },
            { id: 33, name: "Desert Lizard", power: 40000, xp: 400 },
            { id: 34, name: "Bandit", power: 50000, xp: 410 },
            { id: 35, name: "Mercenary", power: 60000, xp: 420 },
            { id: 36, name: "Al Kharid Warrior", power: 70000, xp: 430 },
            { id: 37, name: "Kalaphite Worker", power: 80000, xp: 440 },
            { id: 38, name: "Kalaphite Soldier", power: 90000, xp: 450 },
            { id: 39, name: "Kalaphite Guardian", power: 95000, xp: 460 },
            { id: 40, name: "Kalaphite Queen Spawn", power: 99000, xp: 470 },
        ],
    },

    {
        name: "Edgeville Dungeon",
        powerRange: "100,000 - 400,000",
        loot: [
            { item: "WeaponComponent", chance: 48.5, amount: 5 },
            { item: "ArmorComponent", chance: 48.5, amount: 5 },
            { item: "ToolComponent", chance: 3, amount: 1 },
        ],
        mobs: [
            { id: 41, name: "Skeleton Warrior", power: 110000, xp: 480 },
            { id: 42, name: "Zombie Knight", power: 135000, xp: 490 },
            { id: 43, name: "Chaos Druid", power: 165000, xp: 500 },
            { id: 44, name: "Earth Warrior", power: 200000, xp: 510 },
            { id: 45, name: "Hill Giant", power: 240000, xp: 520 },
            { id: 46, name: "Black Knight", power: 280000, xp: 530 },
            { id: 47, name: "Skeleton Champion", power: 320000, xp: 540 },
            { id: 48, name: "Lesser Demon", power: 350000, xp: 550 },
            { id: 49, name: "Hill Giant Champion", power: 380000, xp: 560 },
            { id: 50, name: "Chaos Champion", power: 395000, xp: 570 },
        ],
    },

    {
        name: "Taverley Dungeon",
        powerRange: "400,000 - 1,500,000",
        loot: [
            { item: "WeaponComponent", chance: 48.94, amount: 6 },
            { item: "ArmorComponent", chance: 48.94, amount: 6 },
            { item: "ToolComponent", chance: 2, amount: 2 },
            { item: "HealthUpgradeStone", chance: 0.08, amount: 1 },
            { item: "DamageUpgradeStone", chance: 0.04, amount: 2 },
        ],
        mobs: [
            { id: 51, name: "Poison Spider", power: 420000, xp: 580 },
            { id: 52, name: "Ghost", power: 520000, xp: 590 },
            { id: 53, name: "Hellhound", power: 650000, xp: 600 },
            { id: 54, name: "Chaos Giant", power: 800000, xp: 610 },
            { id: 55, name: "Greater Demon", power: 950000, xp: 620 },
            { id: 56, name: "Black Demon", power: 1100000, xp: 630 },
            { id: 57, name: "Fire Giant", power: 1250000, xp: 640 },
            { id: 58, name: "Greater Demon Champion", power: 1350000, xp: 650 },
            { id: 59, name: "Demonic Gorger", power: 1450000, xp: 660 },
            { id: 60, name: "Infernal Tyrant", power: 1490000, xp: 670 },
        ],
    },
    {
        name: "Fremennik Slayer Caves",
        powerRange: "1,500,000 - 5,000,000",
        loot: [
            { item: "WeaponComponent", chance: 48.61, amount: 7 },
            { item: "ArmorComponent", chance: 48.61, amount: 7 },
            { item: "ToolComponent", chance: 2.5, amount: 2 },
            { item: "HealthUpgradeStone", chance: 0.16, amount: 1 },
            { item: "DamageUpgradeStone", chance: 0.08, amount: 1 },
            { item: "HeroicShard", chance: 0.04, amount: 1 },
        ],
        mobs: [
            { id: 61, name: "Turoth", power: 1_600_000, xp: 680 },
            { id: 62, name: "Basilisk", power: 1900000, xp: 690 },
            { id: 63, name: "Kurask", power: 2300000, xp: 700 },
            { id: 64, name: "Jelly", power: 2700000, xp: 710 },
            { id: 65, name: "Dust Devil", power: 3100000, xp: 720 },
            { id: 66, name: "Nechryael", power: 3600000, xp: 730 },
            { id: 67, name: "Abyssal Leech", power: 4000000, xp: 740 },
            { id: 68, name: "Abyssal Guardian", power: 4400000, xp: 750 },
            { id: 69, name: "Abyssal Overseer", power: 4800000, xp: 760 },
            { id: 70, name: "Abyssal Demon", power: 4950000, xp: 770 },
        ],
    },

    {
        name: "Dragonkin Isles",
        powerRange: "5,000,000 - 20,000,000",
        loot: [
            { item: "WeaponComponent", chance: 48.7, amount: 8 },
            { item: "ArmorComponent", chance: 48.7, amount: 8 },
            { item: "ToolComponent", chance: 2, amount: 3 },
            { item: "HealthUpgradeStone", chance: 0.3, amount: 1 },
            { item: "DamageUpgradeStone", chance: 0.2, amount: 1 },
            { item: "HeroicShard", chance: 0.1, amount: 1 },
        ],
        mobs: [
            { id: 71, name: "Green Dragon", power: 5500000, xp: 780 },
            { id: 72, name: "Blue Dragon", power: 6500000, xp: 790 },
            { id: 73, name: "Red Dragon", power: 8000000, xp: 800 },
            { id: 74, name: "Black Dragon", power: 10000000, xp: 810 },
            { id: 75, name: "Brutal Green Dragon", power: 12000000, xp: 820 },
            { id: 76, name: "Brutal Blue Dragon", power: 14000000, xp: 830 },
            { id: 77, name: "Brutal Red Dragon", power: 16000000, xp: 840 },
            { id: 78, name: "Brutal Black Dragon", power: 18000000, xp: 850 },
            { id: 79, name: "Dragonkin Sentinel", power: 19200000, xp: 860 },
            { id: 80, name: "Ancient Dragon", power: 19800000, xp: 870 },
        ],
    },
    {
        name: "Wilderness",
        powerRange: "1,000 - 20,000,000",
        loot: [
            { item: "ToolComponent", chance: 40, amount: 2 },
            { item: "HealthUpgradeStone", chance: 40, amount: 1 },
            { item: "DamageUpgradeStone", chance: 20, amount: 1 },
        ],
        mobs: [
            // Early Wildy threats
            { id: 81, name: "Wilderness Rat", power: 1000, xp: 1000 },
            { id: 82, name: "Wilderness Goblin", power: 2000, xp: 1100 },
            { id: 83, name: "Wilderness Spider", power: 3000, xp: 1200 },
            { id: 84, name: "Wilderness Giant Chicken", power: 4000, xp: 1300 },
            { id: 85, name: "Wilderness Giant Rat", power: 5000, xp: 1400 },

            // Mid-tier Wildy mobs
            { id: 86, name: "Wilderness Mugger", power: 10000, xp: 1500 },
            { id: 87, name: "Wilderness Thief", power: 25000, xp: 1600 },
            { id: 88, name: "Wilderness Zombie", power: 50000, xp: 1700 },
            { id: 89, name: "Wilderness Skeleton", power: 80000, xp: 1800 },
            { id: 90, name: "Wilderness Hill Giant", power: 120000, xp: 1900 },
            // High-tier Wildy mobs
            { id: 91, name: "Wilderness Chaos Druid", power: 300000, xp: 2000 },
            { id: 92, name: "Wilderness Lesser Demon", power: 500000, xp: 2100 },
            { id: 93, name: "Wilderness Greater Demon", power: 1000000, xp: 2200 },
            { id: 94, name: "Wilderness Hellhound", power: 2000000, xp: 2300 },
            { id: 95, name: "Wilderness Nechryael", power: 3500000, xp: 2400 },
            // Elite / endgame Wildy threats
            { id: 96, name: "Wilderness Abyssal Demon", power: 5000000, xp: 2500 },
            { id: 97, name: "Wilderness Brutal Green Dragon", power: 8000000, xp: 2600 },
            { id: 98, name: "Wilderness Brutal Blue Dragon", power: 10000000, xp: 2700 },
            { id: 99, name: "Wilderness Ancient Dragon", power: 15000000, xp: 2800 },
            { id: 100, name: "Wilderness Revenant King", power: 19800000, xp: 2900 },
        ]
    }
]

// copy from iqrpg ask chat for rs mob names

export function getMobById(mobId: number) {
    for (const zone of battlingData) {
        const mob = zone.mobs.find(m => m.id === mobId)
        if (mob) {
            return { ...mob, zone: zone.name, loot: zone.loot }
        }
    }
    return null
}

export function getMobsByZone(zoneName: string) {
    const zone = battlingData.find(z => z.name === zoneName)
    return zone ? zone.mobs : []
}