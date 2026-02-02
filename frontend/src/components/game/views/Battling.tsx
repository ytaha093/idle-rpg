import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setActiveAction, setActiveSkill } from "../../../slices/PlayerDataSlice";
import { setCurrentView, setLastResults } from "../../../slices/UIDataSlice";
import { battlingData } from "../../../util/Descriptions/BattlingData";
import ItemTag from "../Tags/ItemTag";
import type { ItemId } from "../../../util/Descriptions/Items";

function Battling() {
    const dispatch = useDispatch();
    const playerData = useSelector((state: RootState) => state.playerData);
    const [expanded, setExpanded] = useState<string | null>(null);

    function toggle(zoneName: string) {
        if (zoneName === "Wilderness") return
        setExpanded((prev) => (prev === zoneName ? null : zoneName));
    }

    function startBattle(zoneName: string, mobId: number, mobName: string) {
        dispatch(setActiveSkill("Battling"));
        dispatch(setLastResults(null));
        dispatch(setActiveAction({ action: "Battling", options: `${zoneName}|${mobId}` }));
        dispatch(setCurrentView(`Battling ${mobName}`));
    }

    return (
        <div>

            <div className="w-full flex justify-start">
                <div className="font-pixel text-lg border-b border-greywhite leading-5.5 text-center pr-3 ml-1.5 mb-1.5 mt-px">
                    Basic Areas
                </div>
            </div>

            <div className="flex flex-col gap-2 m-auto">
                {battlingData.map((zone) => {
                    const isExpanded = expanded === zone.name
                    const isActive = playerData.activeAction.action === "Battling" && playerData.activeAction.options?.startsWith(zone.name)

                    return (<>
                        {zone.name == "Wilderness" && (
                            <div className="w-full flex justify-start">
                                <div className="font-pixel text-lg border-b border-greywhite leading-5.5 text-center pr-3 ml-1.5 mt-1">
                                    Special Areas
                                </div>
                            </div>)}

                        <div key={zone.name} className={`w-full border rounded-xs overflow-hidden bg-grey1 ${isActive ? "border-rsgreendim2" : "border-stone-800"}`} >
                            <div className="flex items-center justify-between px-2.5 py-1.5 hover:cursor-pointer" onClick={() => toggle(zone.name)} >
                                <div className="font-pixele text-xs">
                                    {zone.name}
                                </div>

                                <div className="text-xs text-greywhitedim2">
                                    {(zone.name === "Wilderness") ? "Coming Soon" : `Power Level: ${zone.powerRange}`}
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="px-2.5 pt-2 pb-3 border-t border-stone-800 bg-grey2 flex justify-between">
                                    <div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between items-center text-sm font-pixel font-medium mb-1 pb-1 pl-1 border-b border-grey4">
                                                <div className="text-base">Mobs</div>
                                                <div className="text-right">Power</div>
                                            </div>
                                            {zone.mobs.map((mob) => (
                                                <div key={mob.id}
                                                    className="font-pixel text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c] p-1 rounded hover:bg-grey3 flex items-center justify-between gap-6"
                                                    onClick={() => startBattle(zone.name, mob.id, mob.name)} >
                                                    <div>{mob.name}</div>
                                                    <div className="text-right text-greywhite">{mob.power.toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between items-center text-sm font-pixel font-medium mb-1 pb-1 pl-1 border-b border-grey4">
                                                <div className="text-base">Potential Loot</div>
                                                <div className="grid grid-cols-2 w-4/10 ">
                                                    <div className="text-greywhite text-center">Amount</div>
                                                    <div className="text-greywhite text-end">Chance</div>
                                                </div>

                                            </div>
                                            {zone.loot.map((loot, index) => (
                                                <div key={index} className="text-[0.75rem] flex items-center font-pixel font-normal text-greywhite" >
                                                    <div className="flex-1">
                                                        <ItemTag item={loot.item as ItemId} />
                                                    </div>
                                                    <div className="grid grid-cols-2 w-4/10 ">
                                                        <div className="text-greywhite text-center">{loot.amount}</div>
                                                        <div className="text-greywhite text-end">{loot.chance}%</div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>);
                })}



            </div>
        </div >
    );
}

export default Battling
