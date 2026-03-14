//import chatbox from "../../assets/chatbox wide.png"

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function ChatBox() {

    const playername = useSelector((state: RootState) => state.playerData.name)
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [caretLeft, setCaretLeft] = useState(0);
    const [hasChatOverflow, setHasChatOverflow] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const mirrorRef = useRef<HTMLSpanElement>(null);
    const chatScrollRef = useRef<HTMLDivElement>(null);

    const updateCaret = () => {
        if (!inputRef.current || !mirrorRef.current) return;
        const pos = inputRef.current.selectionStart ?? inputRef.current.value.length;
        mirrorRef.current.textContent = inputRef.current.value.slice(0, pos);
        const measuredWidth = mirrorRef.current.getBoundingClientRect().width;
        setCaretLeft(Math.max(0, measuredWidth - inputRef.current.scrollLeft));
    }

    const moveCaretToEnd = () => {
        if (!inputRef.current || !mirrorRef.current) return;
        const pos = inputRef.current.value.length;
        mirrorRef.current.textContent = inputRef.current.value.slice(0, pos);
        const measuredWidth = mirrorRef.current.getBoundingClientRect().width;
        setCaretLeft(Math.max(0, measuredWidth - inputRef.current.scrollLeft));
    }

    useEffect(() => {
        const scrollEl = chatScrollRef.current;
        if (!scrollEl) return;

        const updateOverflowState = () => {
            setHasChatOverflow(scrollEl.scrollHeight > scrollEl.clientHeight + 1);
        };

        const scheduleUpdate = () => {
            requestAnimationFrame(updateOverflowState);
        };

        scheduleUpdate();

        const resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(scrollEl);

        const mutationObserver = new MutationObserver(scheduleUpdate);
        mutationObserver.observe(scrollEl, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        window.addEventListener("resize", scheduleUpdate);

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, []);


    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-337.5 px-17.5 max-[1350px]:px-1 max-[1350px]:max-w-304.5 w-full h-[22vh]">
            <div className="m-auto w-full h-full bg-[url(assets/chatbox_wide.png)] bg-center bg-size-[100%_100%]">
                <div className="w-full h-full backdrop-brightness-100 font-pixel text-black overflow-hidden flex flex-col">
                    <div className="relative max-w-[98.3%] ml-4.5 mt-[1.1vh] mr-2.25 flex-1 overflow-y-hidden">
                        <div ref={chatScrollRef} className="w-full h-full overflow-y-scroll osrs-scrollbar-dark"  >

                            <div className="">
                                <span className="pr-1 tracking-tighter text-xs">[20:55:13]</span>
                                <span className=" hover:text-grey5 hover:cursor-pointer">yaseen911:</span>
                                <span className="text-[#1b18f0] font-light">Hello friends msg 11321312312312 sadada asdasdasdas asdasd</span>
                            </div>

                            <div><span>yaseen911:</span><span className="text-[#1b18f0] font-light">Hello friends msg 2</span></div>
                            <div><span>yaseen911:</span><span className="text-[#1b18f0] font-light">Hello friends msg 3</span></div>
                            <div><span>{playername}:</span><span className="text-[#1b18f0] font-light">Hello friends msg 4</span></div>
                            <div><span>yaseen911:</span><span className="text-[#1b18f0] font-light">Hello friends msg 5</span></div>
                            <div><span>{playername}:</span><span className="text-[#1b18f0] font-light">Hello friends msg 6</span></div>
                            <div><span>yaseen911:</span><span className="text-[#1b18f0] font-light">Hello friends msg 5</span></div>
                            <div><span>{playername}:</span><span className="text-[#1b18f0] font-light">Hello friends msg 6</span></div>
                            <div><span>yaseen911:</span><span className="text-[#1b18f0] font-light">Hello friends msg 5</span></div>
                            <div><span>{playername}:</span><span className="text-[#1b18f0] font-light">Hello friends msg 6</span></div>
                            <div><span>yaseen911:</span><span className="text-[#1b18f0] font-light">Hello friends msg 5</span></div>
                            <div><span>{playername}:</span><span className="text-[#1b18f0] font-light">Hello friends msg 6</span></div>
                        </div>

                        {!hasChatOverflow && (
                            <div aria-hidden="true" className="osrs-scrollbar-dark-full-thumb" />
                        )}
                    </div>

                    <div className="w-[98.3%] border-t-2 border-[#6a6250] ml-3 mb-2.5 pl-1.5 flex leading-4.5 pt-px">
                        <span className="">{playername}:</span>
                        <div className="relative w-full overflow-hidden">
                            {/* Hidden mirror span used to measure text width for cursor positioning */}
                            <span
                                ref={mirrorRef}
                                aria-hidden="true"
                                className="invisible absolute pointer-events-none whitespace-pre font-pixel [word-spacing:normal]"
                            />

                            <input
                                ref={inputRef}
                                type="text"
                                name="msg"
                                maxLength={120}
                                className=" w-full focus:outline-none text-[#1b18f0] caret-transparent [word-spacing:normal]"
                                onKeyUp={updateCaret}
                                onSelect={updateCaret}
                                onInput={updateCaret}
                                onScroll={updateCaret}
                                onFocus={() => {
                                    setIsInputFocused(true);
                                    requestAnimationFrame(updateCaret);
                                }}
                                onBlur={() => { setIsInputFocused(false); moveCaretToEnd(); }} />

                            {/* Custom * cursor */}
                            <span
                                aria-hidden="true"
                                className={`absolute pointer-events-none top-1/2 -translate-y-1/2 text-[#1b18f0] font-bold leading-none select-none ${isInputFocused ? "animate-blink" : ""}`}
                                style={{ left: caretLeft }}
                            >
                                *
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;