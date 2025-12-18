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

}> = {
    Gold: {
        name: "Gold",
        description: "The primary currency used throughout the realm.",
        textColor: "currency",
        boxColor: "rarity-1"
    },
    Credits: {
        name: "Credits",
        description: "Premium currency used to purchase boosts, increase energy, and other premium items.",
        textColor: "currency",
        boxColor: "currency"
    },
    Metal: {
        name: "Metal",
        description: "Used in the construction of buildings.",
        textColor: "rarity-1",
        boxColor: "rarity-1"
    },
    Wood: {
        name: "Wood",
        description: "Used in the construction of buildings.",
        textColor: "rarity-1",
        boxColor: "rarity-1"
    },
    Stone: {
        name: "Stone",
        description: "Used in the construction of buildings.",
        textColor: "rarity-1",
        boxColor: "rarity-1"
    },
}
