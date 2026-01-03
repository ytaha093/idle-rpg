import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

function Tooltip({ children, content, boxColor }: { children: ReactNode, content: ReactNode, boxColor?: string }) {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [render, setRender] = useState(false)
    const [display, setDisplay] = useState(false)


    const delay = 100

    const timerRef = useRef<number | null>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const dimensionRef = useRef<{ w: number, h: number }>(null)

    function handleMouseEnter(e: React.MouseEvent) {
        setRender(true)
        timerRef.current = window.setTimeout(() => {
            setDisplay(true)
            handleMove(e)
        }, delay)
    }

    function handleMouseLeave(_e: React.MouseEvent) {
        setRender(false)
        setDisplay(false)
        dimensionRef.current = null
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    function handleMove(e: React.MouseEvent) {
        if (dimensionRef.current == null) {
            setPos({ x: 0, y: 0 })
            if (tooltipRef.current != null) {
                const dimentions = tooltipRef.current.getBoundingClientRect()
                dimensionRef.current = { h: dimentions.height, w: dimentions.width }
                handleMove(e)
            }
        } else if (dimensionRef.current != null) {
            const offset = 12
            let x = e.clientX + offset
            let y = e.clientY + offset

            const width = window.innerWidth
            const height = window.innerHeight

            if ((x + dimensionRef.current.w) > (width - 4)) x = x - (offset * 1.2) - dimensionRef.current.w
            if ((y + dimensionRef.current.h) > (height - 4)) y = y - (offset * 1) - dimensionRef.current.h

            setPos({ x: x, y: y })
        }
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMove} className="relative inline">
            {children}

            {render && (
                <>
                    {createPortal(<div data-section="tooltip" className={`font-pixel fixed root z-50 pointer-events-none bg-stone-950 text-xs border-2 border-stone-600 rounded px-2 py-1.5 shadow-lg`}
                        style={{ top: pos.y, left: pos.x, borderColor: `var(--color-${boxColor ?? "stone-600"})`, visibility: display ? "visible" : "hidden" }} ref={tooltipRef}>
                        {content}
                    </div>, document.body)}

                </>
            )}
        </div>
    );
}

export default Tooltip;