import { useDispatch, useSelector } from "react-redux"
import { ITEMS, type ItemId } from "../../util/Descriptions/Items"
import type { RootState } from "../../store"
import { setItemPopup } from "../../slices/UIDataSlice"

function ItemDialog({ item }: { item: ItemId | null }) {

    if (item == null) {
        return <></>
    }

    const itemData = ITEMS[item]
    const itemQuantity = useSelector((state: RootState) => state.invData[item])
    const dispatch = useDispatch()

    async function fadeOutAndClose() {
        const modal = document.querySelector('.animate-scaleInFast') as HTMLElement
        const bg = document.querySelector('.animate-fadeInFast') as HTMLElement
        bg?.classList.add('animate-fadeOutFast')
        modal?.classList.add('animate-scaleOutFast')
        await new Promise(resolve => setTimeout(resolve, 200))
        dispatch(setItemPopup(null))
    }

    return (
        <>
            {item && (
                /* BG Overlay */
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black animate-fadeInFast opacity-60" onClick={() => fadeOutAndClose()} />
                    {/* Modal */}
                    <div className="relative z-10 animate-scaleInFast">
                        <div className=" text-left max-w-100 bg-grey2 text-sm shadow-lg font-pixel">

                            <header className=" bg-grey3 border-[#373737] border-b flex justify-between text-lg font-bold">
                                <span className="px-3 pb-1.5 pt-1.5" style={{ color: `var(--color-${itemData.textColor})` }}>
                                    <span aria-hidden className="mr-px">{itemData.icon}</span>
                                    {itemData.name}
                                </span>
                                <button className="pb-0 mb-3 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer" onClick={fadeOutAndClose}>x</button>
                            </header>


                            <div className="px-4 pt-2 pb-3 ">


                                <div className="text-greywhite whitespace-pre-wrap">{itemData.description}</div>
                                <div className="text-greywhitedim italic font-medium">You have: {itemQuantity}</div>

                                {itemData.tradeable && (
                                    <div className="mt-1 text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => console.log("TODO: add view on market")}>
                                        <span className="text-greywhite">[</span>View On Market<span className="text-greywhite">]</span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default ItemDialog