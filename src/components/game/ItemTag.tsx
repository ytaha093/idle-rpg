import { ITEMS, type ItemId } from "../../util/Descriptions/Items"
import ItemTooltip from "./tooltips/ItemTooltip"
import { useDispatch } from "react-redux"
import { setItemPopup } from "../../slices/UIDataSlice"

function ItemTag({ item, showIcon = true }: { item: ItemId; showIcon?: boolean }) {

    const dispatch = useDispatch()
    const itemData = ITEMS[item]

    const icon = itemData.icon

    return (
        <ItemTooltip item={item}>
            <span onClick={() => dispatch(setItemPopup(item))} className="hover:cursor-pointer" style={{ color: `var(--color-${itemData.textColor})` }}>
                {showIcon && icon && <span aria-hidden className="mr-px align-text-bottom">{icon}</span>}
                [{itemData.name}]
            </span>
        </ItemTooltip>
    )
}

export default ItemTag