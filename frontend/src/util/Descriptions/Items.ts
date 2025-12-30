export type ItemId =
    | "Gold"
    | "Credits"
    | "DungeoneeringTokens"
    | "GatheringSkillShard"
    | "ArtisanShard"
    | "ResourceCache"

    | "Metal"
    | "Wood"
    | "Stone"

    | "WeaponComponent"
    | "ArmorComponent"
    | "ToolComponent"
    | "GemFragment"
    | "RunicLeather"

    | "Ruby"
    | "Diamond"
    | "Dragonstone"
    | "Onyx"

    | "Sandstone"
    | "Marble"
    | "Malachite"

    | "RuneOfLesserFocus"
    | "RuneOfAdeptFocus"
    | "RuneOfGreaterFocus"
    | "RuneOfTheWarrior"
    | "RuneOfTheGladiator"
    | "RuneOfTheLegend"
    | "RuneOfTheWarlord"
    | "GreaterRuneOfTheWarlord"


    | "TreeSap"
    | "SpiderEgg"
    | "BoneMeal"
    | "AlchemicalDust"
    | "VialOfTrollBlood"
    | "UndeadHeart"
    | "BirdsNest"
    | "AlchemicEssence"
    | "GoldenEgg"
    | "DemonicDust"

    | "GoblinCaveKey"
    | "TrollStrongholdKey"
    | "BarrowsTombKey"
    | "DemonicRuinsKey"
    | "DragonLairKey"
    | "GodWarsKey"
    | "AncientVaultKey"

export const ITEMS: Record<ItemId, {
    name: string
    description: string
    icon?: string
    textColor: string
    boxColor: string
    tradeable: boolean
    category: string

}> = {
    // Currency
    Gold: {
        name: "Gold",
        description: "The primary currency used throughout the realm.",
        icon: '🪙',
        textColor: "currency",
        boxColor: "rarity-1",
        tradeable: false,
        category: "Currency",
    },
    Credits: {
        name: "Credits",
        description: "Premium currency used to purchase boosts, increase energy, and other premium items.",
        icon: '💎',
        textColor: "currency",
        boxColor: "currency",
        tradeable: false,
        category: "Currency",
    },
    DungeoneeringTokens: {
        name: "Dungeoneering Tokens",
        description: "Tokens earned from dungeons used to buy dungeon rewards.",
        icon: '🎟️',
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: false,
        category: "Currency",
    },

    GatheringSkillShard: {
        name: "Gathering Skill Shard",
        description: "A shard used to boost gathering skills.",
        icon: '🔹',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: false,
        category: "Currency",
    },
    ArtisanShard: {
        name: "Artisan Shard",
        description: "Shards of the Labyrinth, used to upgrade shrine bonuses.",
        icon: '🔧',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: false,
        category: "Currency",
    },
    ResourceCache: {
        name: "Resource Cache",
        description: "Can be traded on the Black Market for 10,000 of any resource.",
        icon: '💼',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: false,
        category: "Currency",
    },

    // Materials
    Metal: {
        name: "Metal",
        description: "Used in the construction of buildings.",
        icon: '⚙️',
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: true,
        category: "Materials",
    },
    Wood: {
        name: "Wood",
        description: "Used in the construction of buildings.",
        icon: '🪵',
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: true,
        category: "Materials",
    },
    Stone: {
        name: "Stone",
        description: "Used in the construction of buildings.",
        icon: '🪨',
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: true,
        category: "Materials",
    },

    // Components
    WeaponComponent: {
        name: "Weapon Components",
        description: "Used to upgrade weapons.",
        icon: '🗡️',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Components",
    },
    ArmorComponent: {
        name: "Armor Component",
        description: "Used to upgrade armor.",
        icon: '🛡️',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Components",
    },
    ToolComponent: {
        name: "Tool Component",
        description: "Used to upgrade tools.",
        icon: '🛠️',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Components",
    },
    GemFragment: {
        name: "Gem Fragment",
        description: "Used to make gems.",
        icon: '💠',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Components",
    },
    RunicLeather: {
        name: "Runic Leather",
        description: "A piece of leather etched with arcane runes, used to enhance the rune belt.",
        icon: '📜',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Components",
    },

    // Gems
    Ruby: {
        name: "Ruby",
        description: "A red gem used in Jewelcrafting.",
        icon: '🔴',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Gems",
    },
    Diamond: {
        name: "Diamond",
        description: "A clear gem used in Jewelcrafting.",
        icon: '⚪',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Gems",
    },
    Dragonstone: {
        name: "Dragonstone",
        description: "A glowing gem used in Jewelcrafting.",
        icon: '🟣',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Gems",
    },
    Onyx: {
        name: "Onyx",
        description: "A rare dark gem used in Jewelcrafting.",
        icon: '⚫',
        textColor: "rarity-5",
        boxColor: "rarity-5",
        tradeable: true,
        category: "Gems",
    },
    // Stones
    Sandstone: {
        name: "Sandstone",
        description: "A rough stone used to craft basic runes.",
        icon: '🟨',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Stones",
    },

    Marble: {
        name: "Marble",
        description: "A polished stone used to craft advanced runes.",
        icon: '⬜',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Stones",
    },

    Malachite: {
        name: "Malachite",
        description: "A rare green stone used to craft the most potent runes.",
        icon: '🟩',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Stones",
    },

    // Alchemy
    TreeSap: {
        name: "Tree Sap",
        description: "Used to craft potions.",
        icon: '🌿',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Alchemy",
    },
    SpiderEgg: {
        name: "Spider Egg",
        description: "Used to craft potions.",
        icon: '🕷️',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Alchemy",
    },
    BoneMeal: {
        name: "Bone Meal",
        description: "Used to craft potions.",
        icon: '🦴',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Alchemy",
    },
    AlchemicalDust: {
        name: "Alchemical Dust",
        description: "Used to craft potions.",
        icon: '✨',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Alchemy",
    },
    VialOfTrollBlood: {
        name: "Vial Of Troll Blood",
        description: "Used to craft potions.",
        icon: '🧪',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Alchemy",
    },
    UndeadHeart: {
        name: "Undead Heart",
        description: "Used to craft potions.",
        icon: '🩸',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Alchemy",
    },
    BirdsNest: {
        name: "Bird's Nest",
        description: "Used to craft potions.",
        icon: '🪺',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Alchemy",
    },
    AlchemicEssence: {
        name: "Alchemic Essence",
        description: "Used to craft potions.",
        icon: '🔮',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Alchemy",
    },
    GoldenEgg: {
        name: "Golden Egg",
        description: "Used to craft potions.",
        icon: '🥚',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Alchemy",
    },
    DemonicDust: {
        name: "Demonic Dust",
        description: "Used to craft potions.",
        icon: '☠️',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Alchemy",
    },

    // Dungeon keys
    GoblinCaveKey: {
        name: "Goblin Cave Key",
        description: "Key to access the Goblin Cave.",
        icon: '🗝️',
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: true,
        category: "Keys",
    },
    TrollStrongholdKey: {
        name: "Troll Stronghold Key",
        description: "Key to access the Troll Stronghold.",
        icon: '🗝️',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Keys",
    },
    BarrowsTombKey: {
        name: "Barrows Tomb Key",
        description: "Key to access the Barrows Tomb.",
        icon: '🗝️',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Keys",
    },
    DemonicRuinsKey: {
        name: "Demonic Ruins Key",
        description: "Key to access the Demonic Ruins.",
        icon: '🗝️',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Keys",
    },
    DragonLairKey: {
        name: "Dragon Lair Key",
        description: "Key to access the Dragon Lair.",
        icon: '🗝️',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Keys",
    },
    GodWarsKey: {
        name: "God Wars Key",
        description: "Key to access the God Wars altar.",
        icon: '🗝️',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Keys",
    },
    AncientVaultKey: {
        name: "Ancient Vault Key",
        description: "Key to access the Ancient Vault.",
        icon: '🗝️',
        textColor: "rarity-5",
        boxColor: "rarity-5",
        tradeable: true,
        category: "Keys",
    },

    // Runes
    RuneOfLesserFocus: {
        name: "Rune of Lesser Focus",
        description: "+10 or +0.5% Health \n+10 or +0.5% Attack \n+10 or +0.5% Defence",
        icon: '🔰',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Runes",
    },
    RuneOfAdeptFocus: {
        name: "Rune of Adept Focus",
        description: "+20 or +1% Health \n+20 or +1% Attack \n+20 or +1% Defence",
        icon: '🔰',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Runes",
    },
    RuneOfGreaterFocus: {
        name: "Rune of Greater Focus",
        description: "+40 or +2% Health \n+40 or +2% Attack \n+40 or +2% Defence",
        icon: '🔰',
        textColor: "rarity-2",
        boxColor: "rarity-2",
        tradeable: true,
        category: "Runes",
    },
    RuneOfTheWarrior: {
        name: "Rune of the Warrior",
        description: "+70 or +3.5% Health \n+70 or +3.5% Attack \n+70 or +3.5% Defence \n+0.5% Resources",
        icon: '🔹',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Runes",
    },

    RuneOfTheGladiator: {
        name: "Rune of the Gladiator",
        description: "+150 or +7.5% Health \n+150 or +7.5% Attack \n+150 or +7.5% Defence \n+1.5% Resources",
        icon: '🔷',
        textColor: "rarity-3",
        boxColor: "rarity-3",
        tradeable: true,
        category: "Runes",
    },
    RuneOfTheLegend: {
        name: "Rune of the Legend",
        description: "+250 or +12.5% Health \n+250 or +12.5% Attack \n+250 or +12.5% Defence \n+3% Resources",
        icon: '🔸',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Runes",
    },
    RuneOfTheWarlord: {
        name: "Rune of the Warlord",
        description: "+400 or +12.5% Health \n+400 or +12.5% Attack \n+400 or +12.5% Defence \n+4.5% Resources",
        icon: '🔶',
        textColor: "rarity-4",
        boxColor: "rarity-4",
        tradeable: true,
        category: "Runes",
    },
    GreaterRuneOfTheWarlord: {
        name: "Greater Rune of the Warlord",
        description: "+600 or +30% Health \n+600 or +30% Attack \n+600 or +30% Defence \n+7% Resources",
        icon: '🔥',
        textColor: "rarity-5",
        boxColor: "rarity-5",
        tradeable: true,
        category: "Runes",
    },
}
