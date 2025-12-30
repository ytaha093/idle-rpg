import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { getToolName } from "../../../util/EquipmentCalcUtils"
import { hammerIcon, hatchetIcon, pickaxeIcon } from "../../../assets/icons"
import ToolTooltip from "../tooltips/ToolTooltip"
import { setEquitmentPopup } from "../../../slices/UIDataSlice"
import type { ToolSlot } from "../../../slices/EquipmentSlice"


function ToolTag({ item, showImg = true, showQuality = true }: { item: ToolSlot, showImg?: boolean, showQuality?: boolean }) {

    const tool = useSelector((state: RootState) => state.EquipmentData[item])
    const dispatch = useDispatch()
    const name = getToolName(tool.quality, item)

    function getIcon(name: string) {
        switch (name) {
            case "Hammer": return hammerIcon
            case "Pickaxe": return pickaxeIcon
            case "Hatchet": return hatchetIcon
        }
    }

    return (
        <ToolTooltip item={item}>
            <div onClick={() => dispatch(setEquitmentPopup(item))} className="flex justify-between px-0.5 text-xs hover:cursor-pointer hover:bg-grey2 transition-all duration-100 h-4">
                <div className="flex items-center">

                    {showImg ? <img src={getIcon(item)} alt="" className="h-9/10" /> : ""}

                    {showQuality ? <div className="text-rsgreen text-left text-[0.7rem] px-0.5">{tool.quality}</div> : ""}

                    <div>{name}</div>
                </div>
                <div className="pl-0.5">[<span className="text-rsgreen font-semibold">{tool.level}</span>]</div>
            </div>
        </ToolTooltip>
    )
}

export default ToolTag