import { useSelector } from 'react-redux'
import { useState } from 'react'
import type { RootState } from '../../../store'
import { ITEMS, type ItemId } from '../../../util/Descriptions/Items'
import ItemTag from '../ItemTag'

function Inventory() {
    const inv = useSelector((state: RootState) => state.invData)
    const [category, setCategory] = useState<string>('Currency')

    const categories = [...Array.from(new Set(Object.values(ITEMS).map((i) => i.category))), "Jewels"]

    const visibleItems = Object.keys(ITEMS).filter((id) => {
        const key = id as ItemId
        const item = ITEMS[key]
        return item.category === category
    }) as ItemId[]

    return (
        <>
            <div className='flex gap-3 px-1.5 mt-px '>

                <div className="flex flex-col flex-wrap justify-start gap-1 gap-x-1 min-w-33">
                    <div className='w-full flex justify-start'>
                        <div className='font-pixel text-lg border-b border-greywhite leading-5 text-center pr-2 ml-1 mb-0.5'>Categories</div>
                    </div>

                    {categories.map((c) => (
                        <button key={c} onClick={() => setCategory(c)} className={`px-2 py-1 rounded font-pixel text-sm border border-stone-800 transition-all duration-100 text-greywhitedim2 hover:cursor-pointer hover:bg-grey2 ${category === c ? 'bg-grey2 text-rsgreen hover:text-rsgreenlight' : 'bg-grey1 hover:text-greywhite'}`}>
                            {c}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-1 min-w-65">
                    <div className='w-full flex justify-start'>
                        <div className='font-pixel text-lg border-b border-greywhite leading-5 text-center pr-4 ml-1 mb-0.5'>Items</div>
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        {visibleItems.map((key) => {
                            return (
                                <div key={key} className={`flex justify-between items-center min-w-42 gap-5 px-1 py-1 rounded border border-stone-800 w-full`}>

                                    <div className="flex items-center gap-2 text-xs">
                                        <ItemTag item={key} />
                                    </div>

                                    <div className="font-pixel text-sm font-bold">
                                        {inv[key]}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inventory
