//import chatbox from "../../assets/chatbox wide.png"

import { useState, useRef, useEffect } from "react";
import { io, type Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addChat, type chatLog } from "../../slices/UIDataSlice";
import type { AppDispatch, RootState } from "../../store";

function ChatBox() {

    const dispatch = useDispatch<AppDispatch>()
    const playername = useSelector((state: RootState) => state.playerData.name)
    const log = useSelector((state: RootState) => state.uiData.chatLog)

    const [chatInput, setChatInput] = useState("");
    const [caretLeft, setCaretLeft] = useState(0);
    const [hasChatOverflow, setHasChatOverflow] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const mirrorRef = useRef<HTMLSpanElement>(null);
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<Socket | null>(null);

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

    const sendChatMessage = () => {
        const message = chatInput.trim();
        if (!message) return;

        if (socketRef.current?.connected) {
            socketRef.current.emit("chat:send", { message })
        } else {
            dispatch(addChat({ message: "Unable to send message - not connected sorry :(" }));
        }

        setChatInput("")
        if (mirrorRef.current) mirrorRef.current.textContent = ""
        setCaretLeft(0)

        requestAnimationFrame(() => {
            if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
        })
    }

    useEffect(() => {
        const socket = io({
            path: "/socket.io",
            withCredentials: true,
        })

        socketRef.current = socket

        const handleChatMessage = (payload: chatLog) => {
            console.log(payload)
            dispatch(addChat(payload))

            requestAnimationFrame(() => {
                if (chatScrollRef.current) {
                    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
                }
            });
        };

        socket.on("chat:new", handleChatMessage);

        const scrollEl = chatScrollRef.current;
        if (!scrollEl) {
            return () => {
                socket.off("chat:new", handleChatMessage);
                socket.disconnect();
                socketRef.current = null;
            };
        }

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
            socket.off("chat:new", handleChatMessage);
            socket.disconnect();
            socketRef.current = null;
        };
    }, [dispatch]);


    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-337.5 px-17.5 max-[1350px]:px-1 max-[1350px]:max-w-304.5 w-full h-[23vh]">
            <div className="m-auto w-full h-full bg-[url(assets/chatbox_wide.png)] bg-center bg-size-[100%_100%]">
                <div className="w-full h-full backdrop-brightness-100 font-pixel text-black overflow-hidden flex flex-col">
                    <div className="relative max-w-[98.3%] ml-4.5 mt-[1.1vh] mr-2.25 flex-1 overflow-y-hidden">
                        <div ref={chatScrollRef} className="w-full h-full overflow-y-scroll osrs-scrollbar-dark flex flex-col justify-end-safe wrap-anywhere"  >

                            <div key="welcome">
                                Welcome to Idle Quest!
                            </div>

                            {log.map((chat, index) => {
                                let content

                                if (chat.type === "warn") {
                                    content = <span className="text-red-600">{chat.message}</span>
                                } else {
                                    content = (<>
                                        <span className="pr-1 tracking-tighter text-xs">[{chat.time}]</span>
                                        <span className=" hover:text-grey5 hover:cursor-pointer">{chat.sender?.name}:</span>
                                        <span className="text-[#1b18f0] font-light ">{chat.message}</span></>)
                                }

                                return (
                                    <div key={index}>
                                        {content}
                                    </div>
                                )
                            })}

                        </div>

                        {!hasChatOverflow && (
                            <div aria-hidden="true" className="osrs-scrollbar-dark-full-thumb" />
                        )}
                    </div>

                    <div className="w-[98.3%] border-t-2 border-[#6a6250] ml-3 [@media_((max-height:1300px))]:mb-2.25 [@media_((min-height:1300px))]:mb-3.5 pl-1.5 flex leading-4.5 pt-px">
                        <span className="">{playername}:</span>
                        <div className="relative w-full flex overflow-hidden">

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
                                maxLength={140}
                                value={chatInput}
                                autoComplete="off"
                                className="flex-1 focus:outline-none text-[#1b18f0] caret-transparent [word-spacing:normal] mr-3"
                                onChange={(event) => {
                                    setChatInput(event.target.value)
                                    requestAnimationFrame(updateCaret)
                                }}
                                onKeyDown={(event) => { if (event.key === "Enter") sendChatMessage() }}
                                onKeyUp={updateCaret}
                                onSelect={updateCaret}
                                onInput={updateCaret}
                                onScroll={updateCaret}
                                onFocus={(el) => {
                                    el.target.focus({ preventScroll: true });
                                    requestAnimationFrame(updateCaret);
                                }}
                                onBlur={() => { moveCaretToEnd(); }} />

                            {/* Custom * cursor */}
                            <span
                                aria-hidden="true"
                                className="absolute pointer-events-none top-0  text-[#1b18f0] font-bold leading-none select-none"
                                style={{ left: caretLeft }} >
                                *
                            </span>

                            {/* submit button
                            <button className="w-1/16 h-full ml-3 flex justify-center items-center border border-stone-800 bg-stone-500">
                                Send
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ChatBox;