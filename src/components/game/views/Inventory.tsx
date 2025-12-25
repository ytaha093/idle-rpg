import { useSelector } from 'react-redux'
import { useState } from 'react'
import type { RootState } from '../../../store'
import { ITEMS, type ItemId } from '../../../util/Descriptions/Items'
import ItemTag from '../ItemTag'

function Inventory() {
    const inv = useSelector((state: RootState) => state.invData)
    const [category, setCategory] = useState<string>('Currency')

    const categories = [...Array.from(new Set(Object.values(ITEMS).map((i) => i.category)))]

    const visibleItems = Object.keys(ITEMS).filter((id) => {
        const key = id as ItemId
        const item = ITEMS[key]
        return item.category === category
    }) as ItemId[]

    return (
        <>
            <div className='flex gap-3 px-2'>

                <div className="flex flex-col gap-1">
                    <div className='font-pixel text-base ml-1 border-b h-5 pr-3 mb-0.5'>Categories</div>
                    {categories.map((c) => (
                        <button key={c} onClick={() => setCategory(c)} className={`px-2 py-1 rounded font-pixel text-sm border border-stone-800 transition-all duration-100 hover:cursor-pointer hover:bg-grey2 ${category === c ? 'bg-grey2 text-rsgreen' : 'bg-grey1'}`}>
                            {c}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-start gap-1">
                    <div className='font-pixel text-base ml-1 border-b h-5 pr-3 mb-0.5'>Items</div>
                    {visibleItems.map((key) => {
                        return (
                            <div key={key} className={`flex justify-between items-center min-w-42 gap-4 px-1 py-1 rounded border border-stone-800 w-full`}>

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
        </>
    )
}

export default Inventory
