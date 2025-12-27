import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { getLevel, getLevelProgress } from "../../util/LevelCalcUtil"
import SkillTooltip from "./tooltips/SkillTooltip"
import type { SkillName } from "../../slices/SkillsDataSlice"
import { battleIcon, dungioneeringIcon, miningIcon, woodcuttingIcon, quarryingIcon, runecraftingIcon, jewelcraftingIcon, herbloreIcon } from "../../assets/icons"


function ExperienceBar({ activeSkill, skill }: { activeSkill?: boolean, skill?: SkillName }) {

    const skillData = useSelector((state: RootState) => state.skillData.Skills)
    const activeSkillName = useSelector((state: RootState) => state.playerData.activeSkill)

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

    if (activeSkill) {
        const activeName = activeSkillName as SkillName
        const activeXP = skillData[activeName]
        const activeLevel = getLevel(activeXP)
        const activeProgress = getLevelProgress(activeXP)

        return (
            <>
                <div data-section="active skill xp bar" className="my-0.5">
                    <SkillTooltip skill={activeName}>
                        <div className="w-full h-6 bg-linear-0 to-stone-900 from-grey4 border border-stone-800 relative">
                            <div id="meter" className="w-full h-full bg-linear-0 to-[#392f23] from-[#5c4b38]" style={{ width: `${activeProgress}%` }}></div>
                            <div className=" absolute inset-0 flex justify-center items-center font-pixel text-sm hover:cursor-default">{activeName} Level {activeLevel} ({activeProgress}%)</div>
                        </div>
                    </SkillTooltip>

                </div>

            </>
        )
    } else {
        const activeName = skill as SkillName
        const activeXP = skillData[activeName]
        const activeLevel = getLevel(activeXP)
        const activeProgress = getLevelProgress(activeXP)

        return (
            <>
                <div data-section="skill xp bar" className="mb-0.5">
                    <SkillTooltip skill={activeName}>
                        <div className="w-full h-6 bg-linear-0 to-stone-900 from-grey4 border border-stone-800 relative">
                            <img src={getIconForSkill(activeName)} alt={`${activeName} icon`} className="absolute right-2 top-1/2 -translate-y-1/2 inline-block max-h-5 max-w-6" />
                            <div id="meter" className="w-full h-full bg-g bg-linear-0 to-[#392f23] from-[#5c4b38]" style={{ width: `${activeProgress}%` }}></div>
                            <div className=" absolute inset-0 flex justify-between items-center font-pixel text-xs hover:cursor-default mr-9 ml-1">
                                <span>{activeName}</span> <span>({activeLevel})</span>
                            </div>
                        </div>
                    </SkillTooltip>
                </div>
            </>
        )
    }



}

export default ExperienceBar
