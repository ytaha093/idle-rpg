export type AttributeId =
    | "Health"
    | "Attack"
    | "Defense"
    | "Accuracy"
    | "Dodge"
    | "Gold Rush"
    | "Mining"
    | "Woodcutting"
    | "Quarrying"
    | "Clan Boost"

export const ATTRIBUTES: Record<AttributeId, {
    name: string
    description: string[]
}> = {
    Health: {
        name: "Health",
        description: ["Increases max health."]
    },
    Attack: {
        name: "Attack",
        description: ["Increases damage dealt."]
    },
    Defense: {
        name: "Defense",
        description: ["Reduces damage taken."]
    },
    Accuracy: {
        name: "Accuracy",
        description: ["Each point increases accuracy by 0.01%."]
    },
    Dodge: {
        name: "Dodge",
        description: ["Each point increases dodge by 0.01%."]
    },
    "Gold Rush": {
        name: "Gold Rush",
        description: ["Each point increases gold rush amount by 1%.", "A gold rush gives 100x gold and has a 1/2,000 chance of occurring."]
    },
    Mining: {
        name: "Mining",
        description: ["Each point increases mining rush amount by 1%.", "A mining rush gives 100x metal and has a 1/2,000 chance of occurring."]
    },
    Woodcutting: {
        name: "Woodcutting",
        description: ["Each point increases woodcutting rush amount by 1%.", "A woodcutting rush gives 100x wood and has a 1/2,000 chance of occurring."]
    },
    Quarrying: {
        name: "Quarrying",
        description: ["Each point increases quarrying rush amount by 1%.", "A quarrying rush gives 100x stone and has a 1/2,000 chance of occurring."]
    },
    "Clan Boost": {
        name: "Clan Boost",
        description: ["Each point increases the clan rush amount by 1% and donates at least 1 Credit to the clan.", "A clan rush gives 150x resources and has a 1/5,000 chance of occurring."]
    }
}
