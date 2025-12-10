import { useState } from "react"

function CollapsibleBox({ boxName, children }: { boxName: string, children: React.ReactNode }) {

    const [open, setOpen] = useState(true)

    function toggle(el: React.MouseEvent<HTMLDivElement>) {
        let content = el.currentTarget.nextElementSibling as HTMLElement
        const height = content.scrollHeight

        if (open) {
            content.style.height = `${height}px`
            requestAnimationFrame(() => { content.style.height = "0px" })
        } else {
            content.style.height = "0px"
            requestAnimationFrame(() => { content.style.height = `${height}px` })
        }
        setOpen(!open)
    }


    return (
        <div className="">
            <div className=" relative text-center font-pixel bg-linear-0 from-grey2 to-grey1 border-stone-800 border hover:cursor-pointer" onClick={toggle}>{boxName}
                <span className="absolute right-1.5 font-bold text-lg top-1/2 -translate-y-1/2">
                    {open ? "−" : "+"}
                </span>
            </div>
            <div className={`text-center bg-black ${open ? "border" : ""} border-stone-800 border-t-0 overflow-hidden transition-all duration-300`}>
                <div className="p-0.5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CollapsibleBox