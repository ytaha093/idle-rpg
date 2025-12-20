export type ItemId =
    | "Gold"
    | "Credits"
    | "Metal"
    | "Wood"
    | "Stone"

export const ITEMS: Record<ItemId, {
    name: string
    description: string
    textColor: string
    boxColor: string
    tradeable: boolean

}> = {
    Gold: {
        name: "Gold",
        description: "The primary currency used throughout the realm.",
        textColor: "currency",
        boxColor: "rarity-1",
        tradeable: false,
    },
    Credits: {
        name: "Credits",
        description: "Premium currency used to purchase boosts, increase energy, and other premium items.",
        textColor: "currency",
        boxColor: "currency",
        tradeable: true,
    },
    Metal: {
        name: "Metal",
        description: "Used in the construction of buildings.",
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: true,
    },
    Wood: {
        name: "Wood",
        description: "Used in the construction of buildings.",
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: true,
    },
    Stone: {
        name: "Stone",
        description: "Used in the construction of buildings.",
        textColor: "rarity-1",
        boxColor: "rarity-1",
        tradeable: true,
    },
}
