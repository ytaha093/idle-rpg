import { useState, type ReactNode } from "react";

function Tooltip({ children, content }: { children: ReactNode, content: ReactNode }) {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [show, setShow] = useState(false)

    function handleMove(e: React.MouseEvent) {
        setPos({ x: e.clientX + 12, y: e.clientY + 12 })
    }

    return (
        <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onMouseMove={handleMove} className="relative">
            {children}

            {show && (
                <div className="fixed z-50 pointer-events-none bg-stone-950 text-xs border-2 border-stone-600 rounded-lg px-2 py-1 shadow-lg "
                    style={{ top: pos.y, left: pos.x, }}>
                    {content}
                </div>
            )}
        </div>
    );
}

export default Tooltip;