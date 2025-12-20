import type { ReactNode } from "react"
import Tooltip from "./Tooltip"
import { ITEMS, type ItemId } from "../../../util/Descriptions/Items"
import type { RootState } from "../../../store"
import { useSelector } from "react-redux"

function ItemTooltip({ children, item }: { children: ReactNode, item: ItemId }) {

    const itemData = ITEMS[item]
    const itemQuantity = useSelector((state: RootState) => state.invData[itemData.name as ItemId])


    const content = (
        <div className=" text-left max-w-70 overflow">
            <div className="font-semibold text-sm" style={{ color: `var(--color-${itemData.textColor})` }}>
                {itemData.name}
            </div>

            <div className="text-greywhite my-0.5 whitespace-pre-wrap">{itemData.description}</div>
            <div className="text-greywhitedim italic font-medium">You have: {itemQuantity}</div>

        </div>
    )

    return (
        <>
            <Tooltip content={content} boxColor={itemData.boxColor}>{children}</Tooltip>
        </>
    )
}

export default ItemTooltip