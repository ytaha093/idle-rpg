import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import CurrentResults from "./CurrentResults";
import { getLevel } from "../../../../util/LevelCalcUtil";

const BattlingResults = () => {
    const results = useSelector((state: RootState) => state.uiData.lastResults?.battleData)
    const playername = useSelector((state: RootState) => state.playerData.name)
    const battleXP = useSelector((state: RootState) => state.skillData.Skills.Battling)



    if (!results) return <div className="font-pixel text-center">Starting action...</div>

    return (
        <div className="flex flex-col items-center ">



            <div className="w-full flex items-center justify-between font-pixel">
                <div className="w-[45%] border border-stone-800 text-sm text-center">
                    <div>{playername} <span className="text-xs text-greywhitedim">L{getLevel(battleXP)}</span></div>
                    <div data-section="player hp bar" className="border-t border-stone-800">
                        <div className="w-full h-6 bg-linear-0 to-red-950 from-red-900 relative">
                            <div id="meter" className="w-full h-full bg-linear-0 to-rsgreendim3 from-rsgreendim2" style={{ width: `${(results.player.currentHP / results.player.maxHP) * 100}%` }}></div>
                            <div className="absolute inset-0 flex justify-center items-center font-pixel text-sm hover:cursor-default">{results.player.currentHP} / {results.player.maxHP}</div>
                        </div>
                    </div>

                </div>
                <div className="text-sm">VS</div>
                <div className="w-[45%] border border-stone-800 text-sm text-center *:py-px">
                    <div><span className="text-greywhitedim">{results.mob.mobName}</span></div>
                    <div data-section="mob hp bar" className="border-t border-stone-800">
                        <div className="w-full h-6 bg-linear-0 to-red-950 from-red-900 relative">
                            <div id="meter" className="w-full h-full bg-linear-0 to-rsgreendim3 from-rsgreendim2" style={{ width: `${(results.mob.currentHP / results.mob.maxHP) * 100}%` }}></div>
                            <div className="absolute inset-0 flex justify-center items-center font-pixel text-sm hover:cursor-default">{results.mob.currentHP} / {results.mob.maxHP}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" my-1.5">
                <div className="text-xs">
                    You hit the
                    <span className="text-greywhitedim"> {results.mob.mobName} </span>
                    <span className="text-white"> {results.player.playerHits} time(s) </span>
                    dealing
                    <span className="text-white"> {results.player.playerDamage} damage </span>
                    per hit.
                    <br />
                    You missed
                    <span className="text-white"> {results.player.playerMisses} time(s)</span>
                    .
                </div>

                <div className="text-xs mt-1">
                    The
                    <span className="text-greywhitedim"> {results.mob.mobName} </span>
                    hit you
                    <span className="text-white"> {results.mob.mobHits} time(s) </span>
                    dealing
                    <span className="text-white"> {results.mob.mobDamage} damage </span>
                    per hit.
                    <br />
                    The
                    <span className="text-greywhitedim"> {results.mob.mobName} </span>
                    missed
                    <span className="text-white"> {results.mob.mobMisses} time(s)</span>
                    {results.player.playerDodges > 0 && <> and you dodged <span className="text-white"> {results.player.playerDodges} attack(s)</span>
                    </>}
                    .
                </div>
            </div>


            <div className="text-xs mt-1">
                <CurrentResults />
            </div>


            <div className="mt-3 font-inter">
                <div className="font-pixel font-semibold text-sm text-center mb-px">Action tracker</div>

                <ul className="text-[0.8rem]/4.5">
                    <li className="flex justify-between gap-4">
                        <span className="font-inter">Wins / Losses</span>
                        <span className="text-rsgreendim font-semibold">{(0).toLocaleString()} <span className="text-greywhite">/</span>  {(0).toLocaleString()}</span>
                    </li>

                    <li className="flex justify-between gap-4">
                        <span>Gold Gained</span>
                        <span className="text-rsgreendim font-semibold">{(0).toLocaleString()}</span>
                    </li>

                    <li>
                        <div className="text-greywhitedim font-semibold text-center w-full">({(0).toLocaleString()} per hour)</div>
                    </li>
                </ul>

                <div className="flex justify-center mt-1">
                    <div className="text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c] w-fit" >
                        <span className="text-greywhite">[</span>Reset<span className="text-greywhite">]</span>
                    </div>
                </div>

            </div>
        </div >

    )
}

export default BattlingResults
