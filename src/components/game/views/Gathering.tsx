import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { setActiveSkill } from "../../../slices/PlayerDataSlice"
import { miningIcon, woodcuttingIcon, quarryingIcon } from "../../../assets/icons"
import type { SkillName } from "../../../slices/SkillsDataSlice"
import { getLevel } from "../../../util/LevelCalcUtil"
import ItemTag from "../ItemTag"
import type { ItemId } from "../../../util/Descriptions/Items"

function Gathering() {
    const dispatch = useDispatch()
    const activeSkill = useSelector((state: RootState) => state.playerData.activeSkill)
    const skillXP = useSelector((state: RootState) => state.skillData.Skills)

    const [expanded, setExpanded] = useState<SkillName | null>(null)

    const skills: {
        name: SkillName,
        icon: string,
        loot: { name: string, itemId: string, req: number }[]
    }[] = [
            {
                name: "Mining",
                icon: miningIcon,
                loot: [
                    { name: "Gem Fragments", itemId: "GemFragment", req: 50 },
                    { name: "Ruby", itemId: "Ruby", req: 50 },
                    { name: "Diamond", itemId: "Diamond", req: 60 },
                    { name: "Dragonstone", itemId: "Dragonstone", req: 75 },
                    { name: "Onyx", itemId: "Onyx", req: 100 },
                ]
            },
            {
                name: "Woodcutting",
                icon: woodcuttingIcon,
                loot: [
                    { name: "Tree Sap", itemId: "TreeSap", req: 50 },
                    { name: "Resource Cache", itemId: "ResourceCache", req: 50 },
                    { name: "Bird's Nest", itemId: "BirdsNest", req: 60 },
                    { name: "Golden Egg", itemId: "GoldenEgg", req: 100 },
                ]
            },
            {
                name: "Quarrying",
                icon: quarryingIcon,
                loot: [
                    { name: "Sandstone", itemId: "Sandstone", req: 50 },
                    { name: "Marble", itemId: "Marble", req: 60 },
                    { name: "Malachite", itemId: "Malachite", req: 100 },
                ]
            }
        ]

    function toggle(name: SkillName) {
        setExpanded(prev => prev === name ? null : name)
    }

    function startGather(name: SkillName) {
        dispatch(setActiveSkill(name))
    }

    return (
        <div>

            <div className="flex flex-col gap-3 m-auto">
                {skills.map((skill) => {
                    const level = getLevel(skillXP[skill.name])
                    const isExpanded = expanded === skill.name
                    return (
                        <div key={skill.name} className={`w-full border rounded-xs overflow-hidden bg-grey1 ${activeSkill === skill.name ? "border-rsgreendim" : "border-stone-700"}`}>

                            <div className="flex items-center justify-between px-3 py-2 hover:cursor-pointer" onClick={() => toggle(skill.name)}>
                                <div className="flex items-center gap-3">
                                    <img src={skill.icon} alt={`${skill.name} icon`} className="inline-block max-h-10 max-w-10" />
                                    <div className="font-pixel text-sm">
                                        <div className="font-medium">{skill.name}</div>
                                        <div className="text-[0.8rem] text-neutral-400">Level: {level}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => startGather(skill.name)}>Start {skill.name}</div>
                                    <div className="font-pixel font-medium text-lg pb-1">{isExpanded ? "▴" : "▾"}</div>


                                </div>
                            </div>

                            {isExpanded && (
                                <div className="px-3 pt-2 pb-3 border-t border-stone-700 bg-grey2 flex justify-between">

                                    <div className="text-sm">Tool: Pickaxe (4)</div>
                                    <div className="w-4/9">
                                        <div className="flex items-center font-pixel text-sm font-medium mb-px">
                                            <div className="flex-5">Potential Loot</div>
                                            <div className="flex-4">Level Required</div>
                                        </div>
                                        {skill.loot.map((loot, index) => (
                                            <div key={index} className="pt-px text-[0.8rem] flex items-center font-pixel font-normal text-greywhitedim2">

                                                <div className="flex-5"><ItemTag item={loot.itemId as ItemId} /></div>
                                                <div className="flex-4">{loot.req}</div>
                                            </div>

                                        ))}

                                    </div>
                                </div>
                            )}

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Gathering
