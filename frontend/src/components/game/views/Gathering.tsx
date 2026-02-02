import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setActiveAction, setActiveSkill } from "../../../slices/PlayerDataSlice";
import type { SkillName } from "../../../slices/SkillsDataSlice";
import { getLevel } from "../../../util/LevelCalcUtil";
import ItemTag from "../Tags/ItemTag";
import type { ItemId } from "../../../util/Descriptions/Items";
import ToolTag from "../Tags/ToolTag";
import { setCurrentView, setLastResults } from "../../../slices/UIDataSlice";
import { gatheringSkills } from "../../../util/Descriptions/GatheringSkills";

function Gathering() {
  const dispatch = useDispatch();
  const activeSkill = useSelector((state: RootState) => state.playerData.activeSkill)
  const skillXP = useSelector((state: RootState) => state.skillData.Skills)

  const [expanded, setExpanded] = useState<SkillName | null>(null)

  function toggle(name: SkillName) {
    setExpanded((prev) => (prev === name ? null : name))
  }

  function startGather(name: SkillName) {
    dispatch(setLastResults(null))
    dispatch(setActiveSkill(name))
    dispatch(setActiveAction({ action: "Gathering", options: name }))
    dispatch(setCurrentView(`Gathering ${name}`))
  }

  return (
    <div>
      <div className="flex flex-col gap-3 m-auto">
        {gatheringSkills.map((skill) => {
          const level = getLevel(skillXP[skill.name]);
          const isExpanded = expanded === skill.name;
          return (
            <div key={skill.name} className={`w-full border rounded-xs overflow-hidden bg-grey1 ${activeSkill === skill.name ? "border-rsgreendim2" : "border-stone-800"}`} >
              <div className="flex items-center justify-between px-3 py-2 hover:cursor-pointer" onClick={() => toggle(skill.name)} >
                <div className="flex items-center gap-3">
                  <img src={skill.icon} alt={`${skill.name} icon`} className="inline-block max-h-10 max-w-10" />
                  <div className="font-pixel text-sm">
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-[0.8rem] text-neutral-400">
                      Level: {level}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => startGather(skill.name)}>
                    Start {skill.name}
                  </div>
                  <div className="font-pixel font-medium text-lg pb-1">
                    {isExpanded ? "▴" : "▾"}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 pt-2 pb-3 border-t border-stone-800 bg-grey2 flex justify-between">
                  <div className="text-xs flex font-pixel h-5 items-center">
                    <span className="font-bold mr-0.5">Tool:</span>
                    <ToolTag item={skill.tool} showImg={false} showQuality={false} />
                  </div>
                  <div className="w-4/9">
                    <div className="flex items-center font-pixel text-sm font-medium mb-px">
                      <div className="flex-5">Potential Loot</div>
                      <div className="flex-4">Level Required</div>
                    </div>
                    {skill.loot.map((loot, index) => (
                      <div key={index} className="pt-px text-[0.8rem] flex items-center font-pixel font-normal text-greywhitedim2">
                        <div className="flex-5">
                          <ItemTag item={loot.itemId as ItemId} />
                        </div>
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
  );
}

export default Gathering;
