import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import ItemTag from "../../Tags/ItemTag";


const CurrentResults = () => {
    const results = useSelector((state: RootState) => state.uiData.lastResults)

    return (<div>
        {results && <>
            <div>+{results.xp.amount} <span className="text-[#bff] font-pixel">[{results.xp.skill} Exp]</span></div>
            {results.items.map((item) => { return <div key={item.itemId}>+{item.amount} <ItemTag item={item.itemId} /></div> })}
            {results.attribute && <span className="text-rsyellow font-semibold">+1 {results.attribute.attribute}</span>}
        </>}
    </div >)

}

export default CurrentResults;
