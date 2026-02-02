import type { ItemId } from "./Items"

type zone = { name: string, powerRange: string, loot: { item: ItemId, chance: number, amount: number }[], mobs: { id: number, name: string, power: number }[] }

export const battlingData: zone[] = [
    {
        name: "Lumbridge",
        powerRange: "1 - 1,000",
        loot: [
            { item: "WeaponComponent", chance: 50, amount: 1 },
            { item: "ArmorComponent", chance: 50, amount: 1 },
        ],
        mobs: [
            { id: 1, name: "Rat", power: 10 },
            { id: 2, name: "Spider", power: 25 },
            { id: 3, name: "Chicken", power: 40 },
            { id: 4, name: "Frog", power: 40 },
            { id: 5, name: "Man", power: 80 },
            { id: 6, name: "Cow", power: 140 },
            { id: 7, name: "Giant Rat", power: 350 },
            { id: 8, name: "Giant Frog", power: 550 },
            { id: 9, name: "Goblin", power: 750 },
            { id: 10, name: "Goblin Leader", power: 950 },
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
            { id: 11, name: "Mugger", power: 1100 },
            { id: 12, name: "Thief", power: 1400 },
            { id: 13, name: "Highwayman", power: 1800 },
            { id: 14, name: "Giant Bat", power: 2200 },
            { id: 15, name: "Skeleton", power: 2700 },
            { id: 16, name: "Zombie", power: 3200 },
            { id: 17, name: "Ghoul", power: 3700 },
            { id: 18, name: "Vampyre Juvenile", power: 4100 },
            { id: 19, name: "Draynor Werewolf", power: 4500 },
            { id: 20, name: "Count Draynor", power: 4900 },
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
            { id: 21, name: "Sewer Slime", power: 5500 },
            { id: 22, name: "Flesh Crawler", power: 7000 },
            { id: 23, name: "Giant Spider", power: 9000 },
            { id: 24, name: "Zombie Rat", power: 11000 },
            { id: 25, name: "Skeleton Mage", power: 13500 },
            { id: 26, name: "Zombie Guard", power: 16000 },
            { id: 27, name: "Moss Giant", power: 18500 },
            { id: 28, name: "Ankou", power: 21000 },
            { id: 29, name: "Varrock Ankou", power: 23000 },
            { id: 30, name: "Sewer Abomination", power: 24500 },
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
            { id: 31, name: "Desert Snake", power: 26000 },
            { id: 32, name: "Scorpion", power: 32000 },
            { id: 33, name: "Desert Lizard", power: 40000 },
            { id: 34, name: "Bandit", power: 50000 },
            { id: 35, name: "Mercenary", power: 60000 },
            { id: 36, name: "Al Kharid Warrior", power: 70000 },
            { id: 37, name: "Kalaphite Worker", power: 80000 },
            { id: 38, name: "Kalaphite Soldier", power: 90000 },
            { id: 39, name: "Kalaphite Guardian", power: 95000 },
            { id: 40, name: "Kalaphite Queen Spawn", power: 99000 },
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
            { id: 41, name: "Skeleton Warrior", power: 110000 },
            { id: 42, name: "Zombie Knight", power: 135000 },
            { id: 43, name: "Chaos Druid", power: 165000 },
            { id: 44, name: "Earth Warrior", power: 200000 },
            { id: 45, name: "Hill Giant", power: 240000 },
            { id: 46, name: "Black Knight", power: 280000 },
            { id: 47, name: "Skeleton Champion", power: 320000 },
            { id: 48, name: "Lesser Demon", power: 350000 },
            { id: 49, name: "Hill Giant Champion", power: 380000 },
            { id: 50, name: "Chaos Champion", power: 395000 },
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
            { id: 51, name: "Poison Spider", power: 420000 },
            { id: 52, name: "Ghost", power: 520000 },
            { id: 53, name: "Hellhound", power: 650000 },
            { id: 54, name: "Chaos Giant", power: 800000 },
            { id: 55, name: "Greater Demon", power: 950000 },
            { id: 56, name: "Black Demon", power: 1100000 },
            { id: 57, name: "Fire Giant", power: 1250000 },
            { id: 58, name: "Greater Demon Champion", power: 1350000 },
            { id: 59, name: "Demonic Gorger", power: 1450000 },
            { id: 60, name: "Infernal Tyrant", power: 1490000 },
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
            { id: 61, name: "Turoth", power: 1_600_000 },
            { id: 62, name: "Basilisk", power: 1900000 },
            { id: 63, name: "Kurask", power: 2300000 },
            { id: 64, name: "Jelly", power: 2700000 },
            { id: 65, name: "Dust Devil", power: 3100000 },
            { id: 66, name: "Nechryael", power: 3600000 },
            { id: 67, name: "Abyssal Leech", power: 4000000 },
            { id: 68, name: "Abyssal Guardian", power: 4400000 },
            { id: 69, name: "Abyssal Overseer", power: 4800000 },
            { id: 70, name: "Abyssal Demon", power: 4950000 },
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
            { id: 71, name: "Green Dragon", power: 5500000 },
            { id: 72, name: "Blue Dragon", power: 6500000 },
            { id: 73, name: "Red Dragon", power: 8000000 },
            { id: 74, name: "Black Dragon", power: 10000000 },
            { id: 75, name: "Brutal Green Dragon", power: 12000000 },
            { id: 76, name: "Brutal Blue Dragon", power: 14000000 },
            { id: 77, name: "Brutal Red Dragon", power: 16000000 },
            { id: 78, name: "Brutal Black Dragon", power: 18000000 },
            { id: 79, name: "Dragonkin Sentinel", power: 19200000 },
            { id: 80, name: "Ancient Dragon", power: 19800000 },
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
            { id: 81, name: "Wilderness Rat", power: 1000 },
            { id: 82, name: "Wilderness Goblin", power: 2000 },
            { id: 83, name: "Wilderness Spider", power: 3000 },
            { id: 84, name: "Wilderness Giant Chicken", power: 4000 },
            { id: 85, name: "Wilderness Giant Rat", power: 5000 },

            // Mid-tier Wildy mobs
            { id: 86, name: "Wilderness Mugger", power: 10000 },
            { id: 87, name: "Wilderness Thief", power: 25000 },
            { id: 88, name: "Wilderness Zombie", power: 50000 },
            { id: 89, name: "Wilderness Skeleton", power: 80000 },
            { id: 90, name: "Wilderness Hill Giant", power: 120000 },
            // High-tier Wildy mobs
            { id: 91, name: "Wilderness Chaos Druid", power: 300000 },
            { id: 92, name: "Wilderness Lesser Demon", power: 500000 },
            { id: 93, name: "Wilderness Greater Demon", power: 1000000 },
            { id: 94, name: "Wilderness Hellhound", power: 2000000 },
            { id: 95, name: "Wilderness Nechryael", power: 3500000 },
            // Elite / endgame Wildy threats
            { id: 96, name: "Wilderness Abyssal Demon", power: 5000000 },
            { id: 97, name: "Wilderness Brutal Green Dragon", power: 8000000 },
            { id: 98, name: "Wilderness Brutal Blue Dragon", power: 10000000 },
            { id: 99, name: "Wilderness Ancient Dragon", power: 15000000 },
            { id: 100, name: "Wilderness Revenant King", power: 19800000 },
        ]
    }
]

// copy from iqrpg ask chat for rs mob names

export function getMobById(mobId: number) {
    for (const zone of battlingData) {
        const mob = zone.mobs.find(m => m.id === mobId)
        if (mob) {
            return { ...mob, zone: zone.name }
        }
    }
    return null
}

export function getMobsByZone(zoneName: string) {
    const zone = battlingData.find(z => z.name === zoneName)
    return zone ? zone.mobs : []
}