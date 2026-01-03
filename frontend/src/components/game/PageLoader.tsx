import { useEffect, useState } from "react";

export default function PageLoader({ loading }: { loading: boolean }) {
    const [visible, setVisible] = useState(false);
    const [faded, setFaded] = useState(true);

    useEffect(() => {

        if (loading) {
            setVisible(true)
            setFaded(true)
            // Trigger fade in after a frame
            window.setTimeout(() => setFaded(false), 10)
        } else {
            setFaded(true)
            window.setTimeout(() => setVisible(false), 300)
        }

    }, [loading]);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 z-250 flex flex-col items-center justify-center bg-black/30 backdrop-blur-lg transition-opacity duration-300 ${faded ? 'opacity-0' : 'opacity-100'}`}>
            <div className="font-pixelold text-2xl mb-2 text-rsyellow">Loading</div>
            <div className="w-6 h-6 border-2 border-greywhite border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}