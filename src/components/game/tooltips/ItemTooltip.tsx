import type { ReactNode } from "react"
import Tooltip from "./Tooltip"
import { ITEMS, type ItemId } from "../../../util/Descriptions/Items"

function ItemTooltip({ children, item }: { children: ReactNode, item: ItemId }) {

    const itemData = ITEMS[item]

    const content = (
        <div className=" text-left max-w-70 overflow-visible">
            <div className={`font-semibold text-${itemData.textColor} text-xs`}>
                {itemData.name}
            </div>

            <div className="text-greywhite my-1 whitespace-pre-wrap">{itemData.description}</div>
            <div className="text-greywhitedim italic font-semibold">You have: 7,312</div>

        </div>
    )

    return (
        <>
            <Tooltip content={content} boxColor={itemData.boxColor}>{children}</Tooltip>
        </>
    )
}

export default ItemTooltip