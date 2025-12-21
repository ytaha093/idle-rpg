import { ITEMS, type ItemId } from "../../util/Descriptions/Items"
import ItemTooltip from "./tooltips/ItemTooltip"
import { useDispatch } from "react-redux"
import { setItemPopup } from "../../slices/UIDataSlice"


function ItemTag({ item }: { item: ItemId }) {

    const dispatch = useDispatch()
    const itemData = ITEMS[item]


    return (
        <>
            <ItemTooltip item={item}><span onClick={() => dispatch(setItemPopup(item))} className="hover:cursor-pointer" style={{ color: `var(--color-${itemData.textColor})` }}>[{itemData.name}]</span></ItemTooltip>
        </>
    )
}

export default ItemTag