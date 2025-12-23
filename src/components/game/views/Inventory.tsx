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
        <div>
            <div className="font-pixel text-base m-1.5 text-center">Select a category to filter items</div>

            <div className="flex gap-2 mb-3 flex-wrap justify-center">
                {categories.map((c) => (
                    <button key={c} onClick={() => setCategory(c)} className={`px-2 py-1 rounded font-pixel text-sm border border-stone-800 transition-all duration-100 hover:cursor-pointer hover:bg-grey2 ${category === c ? 'bg-grey2 text-rsgreen' : 'bg-black'}`}>
                        {c}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {visibleItems.map((key) => {
                    return (
                        <div key={key} className={`flex justify-between items-center gap-3 p-2 rounded border border-stone-800 bg-black/40`}>

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
    )
}

export default Inventory
