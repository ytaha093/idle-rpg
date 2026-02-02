import { miningIcon, woodcuttingIcon, quarryingIcon } from "../../assets/icons";
import type { SkillName } from "../../slices/SkillsDataSlice";
import type { ToolSlot } from "../../slices/EquipmentSlice";
import type { ItemId } from "./Items";

export const gatheringSkills: { name: SkillName, icon: string, tool: ToolSlot, loot: { name: ItemId; itemId: string; req: number }[] }[] = [
    {
        name: "Mining",
        icon: miningIcon,
        tool: "Pickaxe",
        loot: [
            { name: "GemFragment", itemId: "GemFragment", req: 50 },
            { name: "Ruby", itemId: "Ruby", req: 50 },
            { name: "Diamond", itemId: "Diamond", req: 60 },
            { name: "Dragonstone", itemId: "Dragonstone", req: 75 },
            { name: "Onyx", itemId: "Onyx", req: 100 },
        ]
    },
    {
        name: "Woodcutting",
        icon: woodcuttingIcon,
        tool: "Hatchet",
        loot: [
            { name: "TreeSap", itemId: "TreeSap", req: 50 },
            { name: "ResourceCache", itemId: "ResourceCache", req: 50 },
            { name: "BirdsNest", itemId: "BirdsNest", req: 60 },
            { name: "GoldenEgg", itemId: "GoldenEgg", req: 100 },
        ]
    },
    {
        name: "Quarrying",
        icon: quarryingIcon,
        tool: "Hammer",
        loot: [
            { name: "Sandstone", itemId: "Sandstone", req: 50 },
            { name: "Marble", itemId: "Marble", req: 60 },
            { name: "Malachite", itemId: "Malachite", req: 100 },
        ]
    }
]
