import { useSelector } from "react-redux"
import type { RootState } from "../../store"

function BonusBox() {

    const playerData = useSelector((state: RootState) => state.playerData)

    return (
        <div className="p-0.5">
            <div className=" w-full h-6 bg-linear-0 to-stone-900 from-grey4 border border-stone-800 relative">
                <div id="meter" className="w-full h-full bg-linear-0 to-[#392f23] from-[#5c4b38]" style={{ width: `${(playerData.bonusProgress / playerData.bonusCap) * 100}%` }}></div>
                <div className=" absolute inset-0 flex justify-center items-center font-pixel hover:cursor-default">{playerData.bonusProgress}/{playerData.bonusCap}</div>
            </div>
        </div>
    )
}

export default BonusBox