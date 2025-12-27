import type { ReactNode } from "react"
import type { SkillName } from "../../../slices/SkillsDataSlice"
import { getLevel, getLevelProgress, getNextLevelXP } from "../../../util/LevelCalcUtil"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store"
import Tooltip from "./Tooltip"
import { battleIcon, dungioneeringIcon, miningIcon, woodcuttingIcon, quarryingIcon, runecraftingIcon, jewelcraftingIcon, herbloreIcon } from "../../../assets/icons"

function SkillTooltip({ children, skill }: { children: ReactNode, skill: SkillName }) {

    const skillData = useSelector((state: RootState) => state.skillData.Skills)

    const xp = skillData[skill]
    const nextXP = getNextLevelXP(xp)
    const level = getLevel(xp)
    const progress = getLevelProgress(xp)
    const xpRemaining = nextXP - xp

    function getIconForSkill(name: SkillName) {
        switch (name) {
            case "Battling": return battleIcon
            case "Dungeoneering": return dungioneeringIcon
            case "Mining": return miningIcon
            case "Woodcutting": return woodcuttingIcon
            case "Quarrying": return quarryingIcon
            case "Runecrafting": return runecraftingIcon
            case "Jewelcrafting": return jewelcraftingIcon
            case "Herblore": return herbloreIcon
            default: return battleIcon
        }
    }

    const content = (
        <div className=" text-left">
            <div className=" font-semibold text-sm flex items-center gap-2">
                <img src={getIconForSkill(skill)} alt={`${skill} icon`} className="inline-block max-h-5 max-w-6" />
                <span>{skill}</span>
            </div>
            <div className="flex gap-2.5">
                <div className="flex flex-col">
                    <span>Level:</span>
                    <span>Exp:</span>
                    <span>Next Level:</span>
                    <span>Remaining:</span>
                </div>
                <div className="flex flex-col">
                    <span>{level}</span>
                    <span>{xp}</span>
                    <span>{nextXP}</span>
                    <span>{xpRemaining}</span>
                </div>
            </div>

            <div data-section="tooltip" className="min-w-36 h-5.5 bg-linear-0 to-stone-900 from-grey4 border border-stone-800 relative my-0.5 rounded-xs">
                <div id="meter" className="w-full h-full bg-g bg-linear-0 to-[#392f23] from-[#5c4b38]" style={{ width: `${progress}%` }}></div>
                <div className=" absolute inset-0 flex justify-center items-center font-pixel text-xs  hover:cursor-default">{`${progress}%`}</div>
            </div>
        </div>
    )

    return (
        <>
            <Tooltip content={content}>{children}</Tooltip>
        </>
    )
}

export default SkillTooltip