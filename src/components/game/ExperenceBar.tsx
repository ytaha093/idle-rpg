import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { getLevel, getLevelProgress } from "../../util/LevelCalcUtil"


function ExperenceBar({ activeSkill, skill }: { activeSkill?: boolean, skill: string }) {

    const skillData = useSelector((state: RootState) => state.skillData.Skills)
    const playerData = useSelector((state: RootState) => state.playerData)
    type SkillName = keyof typeof skillData

    if (activeSkill) {
        const activeName = playerData.activeSkill as SkillName
        const activeXP = skillData[activeName]
        const activeLevel = getLevel(activeXP)
        const activeProgress = getLevelProgress(activeXP)

        return (
            <>
                <div data-section="active skill xp bar" className="my-0.5">
                    <div className="w-full h-6 bg-linear-0 to-stone-900 from-grey4 border border-stone-800 relative">
                        <div id="meter" className="w-full h-full bg-linear-0 to-[#392f23] from-[#5c4b38]" style={{ width: `${activeProgress}%` }}></div>
                        <div className=" absolute inset-0 flex justify-center items-center font-pixel hover:cursor-default">{activeName} Level {activeLevel} ({activeProgress}%)</div>
                    </div>
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
                    <div className="w-full h-6 bg-linear-0 to-stone-900 from-grey4 border border-stone-800 relative">
                        <div id="meter" className="w-full h-full bg-g bg-linear-0 to-[#392f23] from-[#5c4b38]" style={{ width: `${activeProgress}%` }}></div>
                        <div className=" absolute inset-0 flex justify-center items-center font-pixel text-sm hover:cursor-default">
                            {activeName} ({activeLevel})
                        </div>
                    </div>
                </div>
            </>
        )
    }



}

export default ExperenceBar
