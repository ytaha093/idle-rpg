import { useState } from "react"
import { ITEMS, type ItemId } from "../../util/Descriptions/Items"
import ItemTooltip from "./tooltips/ItemTooltip"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"

function ItemTag({ item }: { item: ItemId }) {

    const [open, setOpen] = useState(false)

    const itemData = ITEMS[item]
    const itemQuantity = useSelector((state: RootState) => state.invData[itemData.name as ItemId])

    async function fadeOutAndClose() {
        console.log("closeing")
        const modal = document.querySelector('.animate-scaleInFast') as HTMLElement
        const bg = document.querySelector('.animate-fadeInFast') as HTMLElement
        bg?.classList.add('animate-fadeOutFast')
        modal?.classList.add('animate-scaleOutFast')
        await new Promise(resolve => setTimeout(resolve, 200))
        setOpen(false)
    }

    const content = (
        <div className=" text-left max-w-100 bg-grey2 text-sm shadow-lg font-pixel">

            <header className=" bg-grey3 border-[#373737] border-b flex justify-between text-lg font-bold">
                <span className="px-4 pb-1.5 pt-1.5" style={{ color: `var(--color-${itemData.textColor})` }}>{itemData.name}</span>
                <button className="pb-0 mb-3 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer" onClick={fadeOutAndClose}>x</button>
            </header>


            <div className="px-4 pt-2 pb-3 ">


                <div className="text-greywhite">{itemData.description}</div>
                <div className="text-greywhitedim italic font-medium">You have: {itemQuantity}</div>

                {itemData.tradeable && (
                    <div className="mt-1 text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => console.log("TODO: add view on market")}>
                        <span className="text-greywhite">[</span>View On Market<span className="text-greywhite">]</span>
                    </div>
                )}

                <div className="hidden absolute -top-3.5 -right-3.5 bg-stone-950 border-stone-400 border-2 rounded-[50%] w-8 h-8 pb-0.5 flex justify-center items-center font-pixel text-xl hover:cursor-pointer hover:bg-red-700 transition-colors duration-50"
                    onClick={fadeOutAndClose}>
                    x
                </div>
            </div>
        </div>
    )
    console.log(itemData.textColor)
    return (
        <>
            <ItemTooltip item={item}><span onClick={() => setOpen(true)} className="hover:cursor-pointer" style={{ color: `var(--color-${itemData.textColor})` }}>[{itemData.name}]</span></ItemTooltip>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black animate-fadeInFast opacity-60" onClick={() => fadeOutAndClose()} />
                    <div className="relative z-10 animate-scaleInFast">
                        {content}
                    </div>
                </div>
            )}
        </>
    )
}

export default ItemTag