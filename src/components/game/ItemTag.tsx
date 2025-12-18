import { ITEMS, type ItemId } from "../../util/Descriptions/Items"
import ItemTooltip from "./tooltips/ItemTooltip"

function ItemTag({ item }: { item: ItemId }) {

    const itemData = ITEMS[item]


    return <ItemTooltip item={item}><span className={`text-${itemData.textColor} hover:cursor-pointer`}>[{itemData.name}]</span></ItemTooltip>
}

export default ItemTag